package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"os"
	"slices"
	"strings"

	util "github.com/gimnazija_api/util"
)

type AuthService interface {
	GenerateOauthCsrfToken() string
	GenerateGoogleAuthCodeUrl(state string) string
	ExchangeGoogleAuthCode(ctx context.Context, code string) (*util.UserFromToken, error)
}

type authService struct {
	googleOauth *util.GoogleOauth
}

func (s *authService) GenerateOauthCsrfToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.StdEncoding.EncodeToString(b)
}

func (s *authService) GenerateGoogleAuthCodeUrl(state string) string {
	return s.googleOauth.GetGoogleAuthUri(state)
}

func (s *authService) ExchangeGoogleAuthCode(ctx context.Context, code string) (*util.UserFromToken, error) {
	token, err := s.googleOauth.ExchangeGoogleAuthCode(code)

	if err != nil {
		return nil, err
	}

	userFromToken, err := util.GetUserFromTokenWithoutValidation(token.IdToken)

	if err != nil {
		return nil, err
	}

	validEmails := strings.Split(os.Getenv("VALID_EMAILS"), ",")

	if !slices.Contains(validEmails, userFromToken.Email) {
		return nil, errors.New("invalid email")
	}

	return userFromToken, nil
}

func NewAuthService(googleOauth *util.GoogleOauth) AuthService {
	return &authService{googleOauth: googleOauth}
}
