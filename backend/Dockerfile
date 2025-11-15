# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

# Copiar archivos para dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar todas las dependencias
RUN pnpm install --frozen-lockfile

# Copiar resto del proyecto
COPY . .

# Generar Prisma client
RUN pnpm prisma generate

# Compilar TS
RUN pnpm build


# ---------- Stage 2: Runtime ----------
FROM node:20-alpine AS runtime

WORKDIR /app

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

# Copiar SOLO node_modules (ya contiene prisma client)
COPY --from=builder /app/node_modules ./node_modules

# Copiar dist compilado
COPY --from=builder /app/dist ./dist

# Copiar pila Prisma (schema y migraciones)
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/index.js"]
