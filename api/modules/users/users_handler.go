package users

import (
	"net/http"

	db "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/gin-gonic/gin"
)

type UsersHandler struct {
	db *db.Queries
}

func NewUsersHandler(db *db.Queries) *UsersHandler {
	return &UsersHandler{db: db}
}

func (h *UsersHandler) RegisterRouteHandlers(rg *gin.RouterGroup) {
	rg.POST("/users", func(c *gin.Context) {
		var userParams db.InsertOrUpdateUserParams

		if err := c.BindJSON(&userParams); err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeInvalidBody, err)
			return
		}

		user, err := h.db.InsertOrUpdateUser(c, userParams)

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeUnknown, err)
			return
		}

		c.JSON(http.StatusOK, user)
	})
}
