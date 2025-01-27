-- name: InsertOrUpdateUser :one
INSERT INTO users (email, picture, name)
VALUES ($1, $2, $3)
ON CONFLICT (email) DO UPDATE SET picture = $2, name = $3, updated_at = now()
RETURNING *;

-- name: GetUserByEmail :one
SELECT id, name, picture, email FROM users 
WHERE email = $1;