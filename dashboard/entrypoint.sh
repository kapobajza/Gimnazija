#!/bin/sh

if [ -f "/run/secrets/dashboard_jwt_secret" ]; then
    export JWT_SECRET=$(cat /run/secrets/dashboard_jwt_secret)
fi

if [ -f "/run/secrets/dashboard_app_keys" ]; then
    export APP_KEYS=$(cat /run/secrets/dashboard_app_keys)
fi

if [ -f "/run/secrets/dashboard_api_token_salt" ]; then
    export API_TOKEN_SALT=$(cat /run/secrets/dashboard_api_token_salt)
fi

if [ -f "/run/secrets/dashboard_admin_jwt_secret" ]; then
    export ADMIN_JWT_SECRET=$(cat /run/secrets/dashboard_admin_jwt_secret)
fi

if [ -f "/run/secrets/dashboard_transfer_token_salt" ]; then
    export TRANSFER_TOKEN_SALT=$(cat /run/secrets/dashboard_transfer_token_salt)
fi

if [ -f "/run/secrets/database_password" ]; then
    export DATABASE_PASSWORD=$(cat /run/secrets/database_password)
fi

exec "$@"