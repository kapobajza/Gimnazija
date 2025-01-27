package main

import (
	"fmt"
	"os"

	"github.com/gimnazija_api/bootstrap"
	"github.com/gimnazija_api/modules/auth"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dbUri := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost,
		dbPort,
		dbUser,
		dbPassword,
		dbName,
	)

	db, conn := bootstrap.SetupDatabase(dbUri)
	defer conn.Close()
	engine := gin.Default()
	router := bootstrap.SetupRouter(engine)

	googleOauthConfig, sessionStore := bootstrap.SetupAppConfig()

	authHandler := auth.NewAuthHandler(auth.NewAuthService(googleOauthConfig), sessionStore, db)
	authHandler.RegisterRouteHandlers(router)

	engine.Run(":" + os.Getenv("API_PORT"))
}
