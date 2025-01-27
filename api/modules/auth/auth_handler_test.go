package auth

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	db "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	testutil "github.com/gimnazija_api/testutil"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

type MockAuthService struct {
	mock.Mock
}

func (m *MockAuthService) GenerateGoogleAuthCodeUrl(state string) string {
	args := m.Called(state)
	return args.String(0)
}

func (m *MockAuthService) ExchangeGoogleAuthCode(ctx context.Context, code string) (*util.UserFromToken, error) {
	args := m.Called(ctx, code)
	return args.Get(0).(*util.UserFromToken), args.Error(1)
}

func (m *MockAuthService) GenerateOauthCsrfToken() string {
	args := m.Called()
	return args.String(0)
}

func (m *MockAuthService) InsertUser(c context.Context, user *util.UserFromToken) (db.User, error) {
	args := m.Called(c, user)
	return args.Get(0).(db.User), args.Error(1)
}

type AuthTestSuite struct {
	testutil.BaseTestSuite
	authHandler     *AuthHandler
	mockAuthService *MockAuthService
}

func (s *AuthTestSuite) SetupSuite() {
	s.BaseTestSuite.SetupSuite()
	s.mockAuthService = new(MockAuthService)
	s.authHandler = NewAuthHandler(s.mockAuthService, s.SessionStore, s.DB)
	s.authHandler.RegisterRouteHandlers(s.Router)
}

func (s *AuthTestSuite) TestGoogleLoginRouteSuccess() {
	mockState := "state"

	s.mockAuthService.On("GenerateOauthCsrfToken").Return(mockState)
	s.mockAuthService.On("GenerateGoogleAuthCodeUrl", mockState).Return(s.GoogleOauth.GetGoogleAuthUri(mockState))

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/auth/google/login", nil)
	s.Engine.ServeHTTP(w, req)

	s.Equal(http.StatusTemporaryRedirect, w.Code)
	s.Equal(s.GoogleOauth.GetGoogleAuthUri(mockState), w.Header().Get("Location"))
}

func (s *AuthTestSuite) TestGoogleCallbackRouteSuccess() {
	mockState := "state"
	mockCode := "code"
	mockEmail := "user@email.com"

	s.mockAuthService.On("ExchangeGoogleAuthCode", mock.Anything, mockCode).Return(
		&util.UserFromToken{Email: mockEmail, Name: "User Name"},
		nil,
	)

	w := httptest.NewRecorder()

	req, _ := http.NewRequest("GET", "/auth/google/callback?state="+mockState+"&code="+mockCode, nil)

	session, err := s.SessionStore.Get(req, oauthStateCsrfKey)

	if err != nil {
		s.T().Fatal(err)
	}

	session.Values["state"] = mockState
	session.Save(req, w)

	s.Engine.ServeHTTP(w, req)

	user, err := s.DB.GetUserByEmail(context.Background(), mockEmail)

	if err != nil {
		s.T().Fatal(err)
	}

	s.Equal(http.StatusOK, w.Code)
	s.Equal(user.Email, mockEmail)
}

func TestAuthSuite(t *testing.T) {
	suite.Run(t, new(AuthTestSuite))
}
