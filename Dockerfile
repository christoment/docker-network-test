FROM node:16.15-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json ./
COPY src ./src

RUN npm ci --production

ENTRYPOINT [ "npm", "run", "start" ]
