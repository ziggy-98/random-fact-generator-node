FROM node:20-alpine AS base
RUN npm install -g npm@latest && \
    apk update && \
    apk upgrade

FROM base AS build

WORKDIR usr/src/app

COPY package*.json tsconfig.json .babelrc prisma/schema.prisma ./
COPY config ./config
COPY src ./src

RUN npm install
RUN npx prisma generate
RUN npm run build

FROM build AS dist

WORKDIR usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/config ./config
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]