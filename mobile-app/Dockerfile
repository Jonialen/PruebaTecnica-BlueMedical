# ---------- 1) Imagen para build ----------
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Construye la versión web
RUN npx expo export:web

# ---------- 2) Imagen para producción (Nginx) ----------
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copia tu config de nginx opcionalmente
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
