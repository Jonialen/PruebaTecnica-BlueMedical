FROM node:18 AS builder

WORKDIR /app

ARG EXPO_PUBLIC_BACKEND_URL_LOCAL
ARG EXPO_PUBLIC_BACKEND_URL_PHONE

# Convertir args a env vars para que Expo las use
ENV EXPO_PUBLIC_BACKEND_URL_LOCAL=$EXPO_PUBLIC_BACKEND_URL_LOCAL
ENV EXPO_PUBLIC_BACKEND_URL_PHONE=$EXPO_PUBLIC_BACKEND_URL_PHONE

COPY package.json ./
RUN npm install

COPY . .

# Construye la versión web
RUN npx expo export --platform web  


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
