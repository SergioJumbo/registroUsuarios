# Usar una imagen de Node para construir la app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
COPY vite.config.* ./
COPY . .

RUN npm install
RUN npm run build

# Usar Nginx para servir los archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]