FROM node:20.16.0 AS build
WORKDIR /app
COPY package*.json .
COPY . .
RUN yarn install
ENV NODE_OPTIONS=--openssl-legacy-provider
EXPOSE 3000
CMD ["/bin/sh", "-c", "yarn start"]