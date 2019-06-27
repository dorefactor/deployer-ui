# -----------------------------------
# STAGE 1: Build
# -----------------------------------
FROM node:10 AS builder

WORKDIR /rd-ui

COPY package.json .

COPY .yarnrc .

RUN yarn install

COPY ./ .

ARG RD_API=http://rd-api.local:5000

ENV RD_API ${RD_API}

RUN yarn prebuild

ARG ENV=prod

RUN $(npm bin)/ng build --aot --${ENV}

# -----------------------------------
# STAGE 2: Setup
# -----------------------------------
FROM nginx:1.15.9-alpine

LABEL maintainers="Jorge Alvarez <alvarez.jeap@gmail.com>"

WORKDIR /opt/apps/rd-ui

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/* \
    && touch /var/run/nginx.pid \
    && adduser -D rd-ui \
    && chown -R rd-ui /var/run/nginx.pid \
    && chown -R rd-ui /var/cache/nginx 

COPY --from=builder /rd-ui/dist/rd-ui /usr/share/nginx/html

ENV PORT 8000

EXPOSE $PORT

USER rd-ui

CMD ["nginx", "-g", "daemon off;"]