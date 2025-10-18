#!/bin/sh

# This script substitutes environment variables in the nginx template
# and then starts the nginx server.

# If PORT is not set, default to 8080 for local testing
export PORT=${PORT:-8080}

# Substitute environment variables in the template file
# and output it to the final nginx configuration file.
envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx in the foreground. 'daemon off;' is important for container environments.
nginx -g 'daemon off;'

