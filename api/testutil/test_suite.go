package testuitl

import (
	"context"
	"database/sql"
	"fmt"
	"os/exec"
	"path"
	"strings"
	"time"

	"github.com/gimnazija_api/bootstrap"
	db "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	postgresMigrate "github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/gorilla/sessions"
	"github.com/stretchr/testify/suite"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
)

type BaseTestSuite struct {
	suite.Suite
	Engine       *gin.Engine
	Router       *gin.RouterGroup
	DB           *db.Queries
	PgContainer  *postgres.PostgresContainer
	SessionStore *sessions.CookieStore
	GoogleOauth  *util.GoogleOauth
	SqlConn      *sql.DB
}

func getRootProjectPath() (string, error) {
	cmd := exec.Command("go", "list", "-m", "-f", "{{.Dir}}")
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(output)), nil
}

func (s *BaseTestSuite) SetupSuite() {
	ctx := context.Background()
	dbName := "test-db"
	rootPath, err := getRootProjectPath()

	if err != nil {
		s.T().Fatal(err)
	}

	pgContainer, err := postgres.Run(ctx,
		"postgres:17.2-alpine",
		postgres.WithInitScripts(path.Join(rootPath, "testutil", "init.sql")),
		postgres.WithDatabase(dbName),
		postgres.WithUsername("postgres"),
		postgres.WithPassword("postgres"),
		testcontainers.WithWaitStrategy(
			wait.
				ForLog("database system is ready to accept connections").
				WithOccurrence(2).
				WithStartupTimeout(5*time.Second),
		),
	)

	if err != nil {
		s.T().Fatal(err)
	}

	s.PgContainer = pgContainer

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		s.T().Fatal(err)
	}

	db, conn := bootstrap.SetupDatabase(connStr)
	s.DB = db
	s.SqlConn = conn

	driver, err := postgresMigrate.WithInstance(conn, &postgresMigrate.Config{})
	if err != nil {
		s.T().Fatal(err)
	}

	m, err := migrate.NewWithDatabaseInstance(fmt.Sprintf("file://%s", path.Join(rootPath, "db", "migration")), dbName, driver)
	if err != nil {
		s.T().Fatal(err)
	}

	err = m.Up()
	if err != nil && err != migrate.ErrNoChange {
		s.T().Fatal(err)
	}

	s.Engine = gin.Default()
	s.Router = bootstrap.SetupRouter(s.Engine)
	s.GoogleOauth, s.SessionStore = bootstrap.SetupAppConfig()
}

func (s *BaseTestSuite) TearDownSuite() {
	if err := s.PgContainer.Terminate(context.Background()); err != nil {
		s.T().Fatal(err)
	}

	if err := s.SqlConn.Close(); err != nil {
		s.T().Fatal(err)
	}
}
