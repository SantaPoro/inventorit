FROM node:12

RUN apt update -y
RUN apt install -y python-dev

WORKDIR /tmp
RUN git clone https://github.com/facebook/watchman.git -b v4.9.0 --depth 1
WORKDIR /tmp/watchman
RUN ./autogen.sh
RUN ./configure
RUN make
RUN make install

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package.json yarn.lock tsconfig.base.json ./

EXPOSE 3000

CMD yarn && yarn --cwd packages/frontend dev
