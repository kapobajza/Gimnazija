package auth

import (
	"database/sql"
	"errors"
	"net/http"
	"os"

	db "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

var (
	oauthStateCsrfKey string = "oauth-csrf-token"
)

type AuthHandler struct {
	authService  AuthService
	sessionStore *sessions.CookieStore
	db           *db.Queries
}

func clearSession(c *gin.Context, session *sessions.Session) {
	session.Options.MaxAge = -1
	session.Save(c.Request, c.Writer)
}

func (r *AuthHandler) RegisterRouteHandlers(rg *gin.RouterGroup) {
	router := rg.Group("/auth")

	router.GET("/google/login", func(c *gin.Context) {
		csrfToken := r.authService.GenerateOauthCsrfToken()
		session, err := r.sessionStore.Get(c.Request, oauthStateCsrfKey)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		session.Values["state"] = csrfToken
		session.Save(c.Request, c.Writer)
		url := r.authService.GenerateGoogleAuthCodeUrl(csrfToken)

		c.Redirect(http.StatusTemporaryRedirect, url)
	})

	router.GET("/google/callback", func(c *gin.Context) {
		session, err := r.sessionStore.Get(c.Request, oauthStateCsrfKey)

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeInvalidSessionState, err)
			return
		}

		state, ok := session.Values["state"].(string)
		clearSession(c, session)

		if !ok || state != c.Query("state") {
			util.AbortWithBadRequestJson(c, util.ErrCodeInvalidSessionState, errors.New("invalid state"))
			return
		}

		userFromToken, err := r.authService.ExchangeGoogleAuthCode(c, c.Query("code"))

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrInvalidAuthCode, err)
			return
		}

		session, err = r.sessionStore.Get(c.Request, os.Getenv("SESSION_COOKIE_NAME"))

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrGettingSession, err)
			return
		}

		user, err := r.db.InsertOrUpdateUser(c, db.InsertOrUpdateUserParams{
			Email:   userFromToken.Email,
			Name:    sql.NullString{String: userFromToken.Name, Valid: true},
			Picture: sql.NullString{String: userFromToken.Picture, Valid: true},
		})

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrRetrievingUser, err)
			return
		}

		session.Values["user_email"] = user.Email
		session.Values["user_id"] = user.ID
		session.Save(c.Request, c.Writer)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
}

func NewAuthHandler(authService AuthService, sessionStore *sessions.CookieStore, db *db.Queries) *AuthHandler {
	return &AuthHandler{authService: authService, sessionStore: sessionStore, db: db}
}
