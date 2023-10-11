# syntax = docker/dockerfile:1

ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000


WORKDIR /src

# Build
FROM base as build

COPY ./package.json ./yarn.lock ./
RUN yarn install 

ENV NODE_ENV=production

COPY --link . .

RUN yarn prisma generate
RUN yarn build

COPY package.json .
# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
COPY --from=build /src/node_modules /src/node_modules
COPY package.json .
COPY ./prisma .

CMD [ "npm", "start" ]
