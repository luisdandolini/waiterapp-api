FROM node:22-alpine

RUN corepack enable && corepack prepare yarn@4.10.3 --activate

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable

COPY . .

EXPOSE 3001

CMD ["yarn", "dev"]
