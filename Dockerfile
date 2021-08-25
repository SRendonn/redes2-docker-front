FROM node:14-alpine AS development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

FROM nginx AS production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html