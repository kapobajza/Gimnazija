-- name: GetPostsByUser :many
SELECT posts.*, users.* FROM posts
JOIN users ON users.id = posts.user_id
WHERE users.id = $1;

-- name: InsertPost :one
INSERT INTO posts (title, content, slug, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *;