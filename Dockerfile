# 🟢 Etapa 1: Construcción de Angular Universal
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos del proyecto
COPY . .

# Construir la aplicación SSR
RUN npm run build:ssr

# 🟢 Etapa 2: Configuración del Servidor en Node.js
FROM node:18 AS server

WORKDIR /app

# Copiar los archivos compilados de la etapa anterior
COPY --from=build /app/package.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./

# Instalar solo las dependencias de producción
RUN npm install --only=production

# Exponer el puerto en el que corre el servidor SSR
EXPOSE 4000

# Ejecutar el servidor SSR de Angular
CMD ["node", "dist/server/main.js"]
