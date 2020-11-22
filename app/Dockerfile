FROM node:12.18-slim as builder
LABEL authors="cristobal.infantes@gmail.com"
WORKDIR /usr/node
EXPOSE 3000
COPY --chown=node:node . .

RUN yarn && yarn build



FROM nginx:1.19.3-alpine
LABEL authors="cristobal.infantes@gmail.com"
EXPOSE 4000
COPY --from=builder /usr/node/dist /var/www
COPY --from=builder /usr/node/nginx.conf /etc/nginx/nginx.conf