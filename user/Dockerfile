FROM node:12.18-slim
LABEL authors="GRUPO ASV"
WORKDIR /usr/node
EXPOSE 3000
COPY . .

RUN chown -R node:node /usr/node

USER node
CMD ["yarn", "start"]