# Use a lightweight nginx image from Alpine Linux
FROM nginx:1.25.3-alpine

# Install 'gettext' which provides the 'envsubst' utility.
# We'll use this to substitute environment variables into our nginx config.
RUN apk add --no-cache gettext

# Copy all your static web assets to the default nginx public directory
COPY index.html style.css main.js welcome.txt /usr/share/nginx/html/

# Copy the nginx configuration template. This template has a placeholder for the port number.
COPY default.conf.template /etc/nginx/templates/default.conf.template

# This script will run when the container starts.
# It uses envsubst to replace ${PORT} in the template with the actual port
# provided by Railway, then starts nginx.
COPY start.sh /
RUN chmod +x /start.sh

# Expose port 80 - Nginx's default. Railway will map its internal port to this.
EXPOSE 80

# The command to run when the container starts up.
CMD ["/start.sh"]

