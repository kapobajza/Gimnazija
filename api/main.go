package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	sqlc "github.com/gimnazija_api/db/generated"
	appRouter "github.com/gimnazija_api/modules/auth"
	_ "github.com/lib/pq"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	router := server.Group("")
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

	conn, err := sql.Open("postgres", dbUri)

	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()

	db := sqlc.New(conn)

	authRouter := appRouter.NewAuthRouter(db)
	authRouter.RegisterRoutes(router)

	router.GET("/health", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "The Gimnazija API is working fine"})
	})

	server.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{"status": "failed", "message": fmt.Sprintf("The specified route %s not found", ctx.Request.URL)})
	})

	log.Fatal(server.Run(":" + os.Getenv("API_PORT")))
}
