package util

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type GoogleOauth struct {
	ClientID         string
	ClientSecret     string
	Scopes           []string
	TokenUri         string
	AuthorizationUri string
	RedirectUri      string
}

type GoogleAuthTokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	IdToken      string `json:"id_token"`
}

func NewGoogleOauth() GoogleOauth {
	return GoogleOauth{
		ClientID:     os.Getenv("GOOGLE_OAUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_OAUTH_SECRET"),
		Scopes: []string{
			"email",
			"profile",
		},
		TokenUri:         "https://oauth2.googleapis.com/token",
		AuthorizationUri: "https://accounts.google.com/o/oauth2/v2/auth",
		RedirectUri:      os.Getenv("GOOGLE_OAUTH_REDIRECT_URI"),
	}
}

func (g *GoogleOauth) GetGoogleAuthUri(state string) string {
	scopes := strings.Join(g.Scopes, " ")

	return fmt.Sprintf(
		"%s?client_id=%s&redirect_uri=%s&response_type=code&scope=%s&access_type=%s&state=%s&prompt=%s",
		g.AuthorizationUri,
		g.ClientID,
		g.RedirectUri,
		scopes,
		"offline", // Requests a refresh token
		state,
		"consent", // Force the user to consent so that we can get the refresh token
	)
}

func (g *GoogleOauth) ExchangeGoogleAuthCode(code string) (*GoogleAuthTokenResponse, error) {
	data := url.Values{}

	data.Set("code", code)
	data.Set("client_id", g.ClientID)
	data.Set("client_secret", g.ClientSecret)
	data.Set("redirect_uri", g.RedirectUri)
	data.Set("grant_type", "authorization_code")

	resp, err := http.PostForm(g.TokenUri, data)

	if err != nil {
		return nil, fmt.Errorf("error exchanging google auth code: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, err := io.ReadAll(resp.Body)

		if err != nil {
			return nil, fmt.Errorf("error exchanging google auth code: %v", err)
		}

		return nil, fmt.Errorf("error response from Google: %s", body)
	}

	var tokenResponse GoogleAuthTokenResponse

	if err := json.NewDecoder(resp.Body).Decode(&tokenResponse); err != nil {
		return nil, fmt.Errorf("error decoding token response: %v", err)
	}

	return &tokenResponse, nil
}

func (g *GoogleOauth) RefreshGoogleAccessToken(refreshToken string) (*GoogleAuthTokenResponse, error) {
	data := url.Values{}

	data.Set("refresh_token", refreshToken)
	data.Set("client_id", g.ClientID)
	data.Set("client_secret", g.ClientSecret)
	data.Set("grant_type", "refresh_token")

	resp, err := http.PostForm(g.TokenUri, data)

	if err != nil {
		return nil, fmt.Errorf("error refreshing google access token: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, err := io.ReadAll(resp.Body)

		if err != nil {
			return nil, fmt.Errorf("error refreshing google access token: %v", err)
		}

		return nil, fmt.Errorf("error response from Google: %s", body)
	}

	var tokenResponse GoogleAuthTokenResponse

	if err := json.NewDecoder(resp.Body).Decode(&tokenResponse); err != nil {
		return nil, fmt.Errorf("error decoding token response: %v", err)
	}

	return &tokenResponse, nil
}
