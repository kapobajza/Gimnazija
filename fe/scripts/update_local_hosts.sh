#!/bin/sh

REVERSE_PROXY_IP=$(getent hosts traefik | awk '{ print $1 }')
echo "$REVERSE_PROXY_IP api.gimnazija.local" >> /etc/hosts

# Execute the original command
exec "$@"