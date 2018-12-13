FROM node:10 as builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV NODE_ENV production

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
