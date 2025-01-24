package api_token

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"
)

type UserFromToken struct {
	Email   string `json:"email"`
	Picture string `json:"picture"`
	Name    string `json:"name"`
}

func parseJWTWithoutValidation(tokenString string) (*UserFromToken, error) {
	parts := strings.Split(tokenString, ".")
	if len(parts) != 3 {
		return nil, fmt.Errorf("invalid token format")
	}

	payload, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("error decoding token payload: %v", err)
	}

	var claims UserFromToken
	err = json.Unmarshal(payload, &claims)
	if err != nil {
		return nil, fmt.Errorf("error unmarshaling token payload: %v", err)
	}

	return &claims, nil
}

func GetUserFromTokenWithoutValidation(tokenString string) (*UserFromToken, error) {
	claims, err := parseJWTWithoutValidation(tokenString)
	if err != nil {
		return nil, err
	}

	return claims, nil
}
