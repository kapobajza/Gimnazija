package posts

import (
	"net/http"

	db "github.com/gimnazija_api/db/generated"
	"github.com/gimnazija_api/util"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PostsHandler struct {
	db *db.Queries
}

func NewPostsHandler(db *db.Queries) *PostsHandler {
	return &PostsHandler{db: db}
}

func (r *PostsHandler) RegisterRouteHandlers(rg *gin.RouterGroup) {
	router := rg.Group("/posts")

	router.GET("/user/:id", func(c *gin.Context) {
		userUUID, err := uuid.Parse(c.Param("id"))

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeInvalidUUID, err)
			return
		}

		posts, err := r.db.GetPostsByUser(c, userUUID)

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrRetrievingPosts, err)
			return
		}

		c.JSON(http.StatusOK, posts)
	})

	router.POST("", func(c *gin.Context) {
		var postParams db.InsertPostParams

		if err := c.BindJSON(&postParams); err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeInvalidBody, err)
		}

		inserted, err := r.db.InsertPost(c, postParams)

		if err != nil {
			util.AbortWithBadRequestJson(c, util.ErrCodeUnknown, err)
			return
		}

		c.JSON(http.StatusOK, inserted)
	})
}
