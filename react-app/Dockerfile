FROM node:alpine
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --silent
RUN npm install -g serve
COPY . . 
RUN npm run build
CMD ["serve", "-s", "build"]
