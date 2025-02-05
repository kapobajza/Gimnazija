package util

import (
	"fmt"
	"net/http"
	"runtime/debug"

	"github.com/gin-gonic/gin"
)

type AppError struct {
	Code    string `json:"code"`
	Message string `json:"-"`
	Stack   string `json:"-"`
}

func (e AppError) Error() string {
	return fmt.Sprintf("%s: %s\nStack trace:\n%s", e.Code, e.Message, e.Stack)
}

type ErrorCode string

const (
	ErrCodeUnknown             ErrorCode = "ERR_UNKNOWN"
	ErrCodeInvalidSessionState ErrorCode = "ERR_INVALID_SESSION_STATE"
	ErrInvalidAuthCode         ErrorCode = "ERR_INVALID_AUTH_CODE"
	ErrGettingSession          ErrorCode = "ERR_GETTING_SESSION"
	ErrRetrievingUser          ErrorCode = "ERR_RETRIEVING_USER"
	ErrCodeInvalidUUID         ErrorCode = "ERR_INVALID_UUID"
	ErrRetrievingPosts         ErrorCode = "ERR_RETRIEVING_POSTS"
	ErrCodeInvalidBody         ErrorCode = "ERR_INVALID_BODY"
)

func NewAppError(code string, message string) AppError {
	return AppError{Code: code, Message: message, Stack: string(debug.Stack())}
}

func AbortWithStatusJson(ctx *gin.Context, status int, code string, message string) {
	err := NewAppError(code, message)
	result := err.Error()
	fmt.Println(result)
	ctx.AbortWithStatusJSON(status, err)
}

func AbortWithBadRequestJson(ctx *gin.Context, code ErrorCode, e error) {
	codeStr := string(code)
	AbortWithStatusJson(ctx, http.StatusBadRequest, codeStr, e.Error())
}
