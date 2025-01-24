-- name: InsertOrUpdateUser :one
INSERT INTO users (email, picture, name)
VALUES ($1, $2, $3)
ON CONFLICT (email) DO UPDATE SET picture = $2, name = $3
RETURNING *;