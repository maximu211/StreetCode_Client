FROM node:alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
