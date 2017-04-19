FROM node:7.5

RUN mkdir -p /usr/web

WORKDIR /usr/web

RUN npm install -g webpack webpack-dev-server

ADD package.json /usr/web/

RUN npm install --allow-root

RUN mkdir -p /usr/web/dist


ENTRYPOINT ["npm","run"]
CMD ["build"]