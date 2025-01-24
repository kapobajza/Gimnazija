package router

import (
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"log"
	"net/http"
	"os"
	"slices"
	"strings"

	db "github.com/gimnazija_api/db/generated"
	util "github.com/gimnazija_api/util"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	googleOauthConfig *oauth2.Config
	store             *sessions.CookieStore
	oauthStateCsrfKey string = "oauth-csrf-token"
)

type AuthRouter struct {
	db *db.Queries
}

func NewAuthRouter(db *db.Queries) *AuthRouter {
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/auth/google/callback",
		ClientID:     os.Getenv("GOOGLE_OAUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_OAUTH_SECRET"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}

	store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
	var secure = true

	if os.Getenv("API_ENV") == "local" {
		secure = false
	}

	store.Options.Secure = secure
	store.Options.SameSite = http.SameSiteLaxMode
	store.Options.Path = "/"
	store.Options.HttpOnly = true

	return &AuthRouter{db: db}
}

func generateStateOauthSession(c *gin.Context) (string, error) {
	b := make([]byte, 32)
	rand.Read(b)
	state := base64.StdEncoding.EncodeToString(b)

	session, err := store.Get(c.Request, oauthStateCsrfKey)

	if err != nil {
		return "", err
	}

	session.Values["state"] = state
	session.Save(c.Request, c.Writer)

	return state, nil
}

func clearSession(c *gin.Context, session *sessions.Session) {
	session.Options.MaxAge = -1
	session.Save(c.Request, c.Writer)
}

func (r *AuthRouter) RegisterRoutes(rg *gin.RouterGroup) {
	router := rg.Group("/auth")

	router.GET("/google/login", func(c *gin.Context) {
		state, err := generateStateOauthSession(c)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		url := googleOauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
		c.Redirect(http.StatusTemporaryRedirect, url)
	})

	router.GET("/google/callback", func(c *gin.Context) {
		session, err := store.Get(c.Request, oauthStateCsrfKey)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		state, ok := session.Values["state"].(string)
		clearSession(c, session)

		if !ok || state != c.Query("state") {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid session state"})
			return
		}

		token, err := googleOauthConfig.Exchange(c, c.Query("code"))

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		log.Printf("Id token: %v", token.Extra("id_token"))
		userFromToken, err := util.GetUserFromTokenWithoutValidation(token.Extra("id_token").(string))

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validEmails := strings.Split(os.Getenv("VALID_EMAILS"), ",")

		if !slices.Contains(validEmails, userFromToken.Email) {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Invalid email"})
			return
		}

		session, err = store.Get(c.Request, os.Getenv("SESSION_COOKIE_NAME"))

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := r.db.InsertOrUpdateUser(c, db.InsertOrUpdateUserParams{
			Email:   userFromToken.Email,
			Name:    sql.NullString{String: userFromToken.Name, Valid: true},
			Picture: sql.NullString{String: userFromToken.Picture, Valid: true},
		})

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		session.Values["user_email"] = user.Email
		session.Values["user_id"] = user.ID
		session.Save(c.Request, c.Writer)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
}
