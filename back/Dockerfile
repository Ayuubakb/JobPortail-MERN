FROM node:20-alpine
WORKDIR /app/back
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD ["node","server.js"]