FROM node:20-alpine
WORKDIR /app/front
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm","start"]