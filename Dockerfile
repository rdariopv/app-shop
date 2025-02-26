# 🟢 Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# 🟢 Etapa 2: Servir con Nginx
FROM nginx:latest
COPY --from=build /app/dist/app-shop/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

