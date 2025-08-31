FROM nginx:alpine

# Replace the main Nginx config
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key
