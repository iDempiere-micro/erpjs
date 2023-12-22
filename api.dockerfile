FROM node:current-alpine3.19 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build api

FROM node:current-alpine3.19 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY --from=development /usr/src/app/dist/apps/api ./dist

CMD ["node", "dist/main"]