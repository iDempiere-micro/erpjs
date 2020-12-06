FROM node:12.13-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production=false

COPY . .

RUN yarn build api

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install  --production=true

COPY . .

COPY --from=development /usr/src/app/dist/apps/api ./dist

CMD ["node", "dist/main"]