FROM node:16-alpine as builder
WORKDIR /front-end

COPY ./package.json /front-end
COPY ./package-lock.json /front-end

RUN yarn install
COPY . /front-end
RUN yarn run build

CMD ["yarn", "start"]