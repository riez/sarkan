FROM node:alpine

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY . /usr/src

RUN yarn install

RUN yarn build

EXPOSE 9000

CMD yarn start
