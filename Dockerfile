# Etapa 1: Construcción de Angular
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json y luego instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build --configuration=production

# Etapa 2: Servidor web Nginx
FROM nginx:1.23-alpine

# Copiar los archivos de la aplicación Angular al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
