# stage 1 building the code
FROM node:12-alpine3.11

LABEL maintainer="sheraz.ali342@gmail.com"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package*.json yarn.lock* ./

RUN yarn
# If you are building your code for production
# RUN yarn --only=production

# Bundle app source
COPY . .

EXPOSE 6001
CMD [ "yarn", "start" ]
