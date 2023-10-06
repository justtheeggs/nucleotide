# Grab the latest version of node
FROM node:18-alpine

#Set the working directory (workspace)
WORKDIR /usr/app

#Update and install dependencies
RUN apk update && apk upgrade
RUN apk add git


#Copy the package.json and package-lock.json
COPY ["../package*.json","./"]

#Install dependencies
RUN npm install && npm cache clean --all

#Copy the rest of the files
COPY ../ .

#Expose the runtime
ENV PATH ./node_modules/.bin/:$PATH
