# stage 1 building the code
FROM node:12-alpine3.11

LABEL maintainer="sheraz.ali342@gmail.com"

# Create app directory
# WORKDIR /usr/src/app
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY yarn.lock .

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
# COPY package*.json yarn.lock* ./

RUN yarn cache clean
RUN yarn
RUN yarn build
# If you are building your code for production
# RUN yarn --only=production

# Bundle app source
COPY . .

# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000
CMD [ "yarn", "start" ]
