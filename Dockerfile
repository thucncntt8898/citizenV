# build stage
FROM node:14.5.0-alpine3.11
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "sh", "entrypoint.sh" ] 