# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con pnpm
RUN pnpm install --frozen-lockfile


ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_API_TIMEOUT

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_API_TIMEOUT=${VITE_API_TIMEOUT}


COPY . .

# Build (tsc + vite build)
RUN pnpm build


# ---------- Etapa 2: Nginx ----------
FROM nginx:stable-alpine

# Copiar el build estático
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
