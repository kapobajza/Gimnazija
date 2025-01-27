package bootstrap

import (
	"database/sql"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"

	sqlc "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
)

func SetupDatabase(connectionString string) (*sqlc.Queries, *sql.DB) {
	conn, err := sql.Open("postgres", connectionString)

	if err != nil {
		log.Fatal(err)
	}

	if err := conn.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to database on: " + connectionString)

	return sqlc.New(conn), conn
}

func SetupRouter(engine *gin.Engine) *gin.RouterGroup {
	router := engine.Group("")

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The Gimnazija API is working fine"})
	})

	engine.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	return router
}

func SetupAppConfig() (*util.GoogleOauth, *sessions.CookieStore) {
	googleOauth := util.NewGoogleOauth()

	sessionKeyHex := os.Getenv("SESSION_KEY")
	sessionKey, err := hex.DecodeString(sessionKeyHex)

	if err != nil {
		log.Fatalf("Failed to decode SESSION_KEY: %v", err)
	}

	sessionStore := sessions.NewCookieStore(sessionKey)
	var secure = true

	if os.Getenv("API_ENV") == "local" {
		secure = false
	}

	sessionStore.Options.Secure = secure
	sessionStore.Options.SameSite = http.SameSiteLaxMode
	sessionStore.Options.Path = "/"
	sessionStore.Options.HttpOnly = true

	return &googleOauth, sessionStore
}
