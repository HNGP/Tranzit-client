FROM node:16-alpine AS deps
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
CMD npm run dev
EXPOSE 3000