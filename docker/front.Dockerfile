FROM node:12.14.0-alpine as build-env

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production=false

COPY . .
RUN yarn build

FROM nginx:latest as static-html
EXPOSE 80
COPY --from=build-env /usr/src/app/dist/ /usr/share/nginx/html