FROM node:12.18-slim
LABEL authors="cristobal.infantes@gmail.com"
WORKDIR /usr/node
EXPOSE 3000
COPY --chown=node:node . .

RUN yarn

USER node
CMD ["yarn", "start"]