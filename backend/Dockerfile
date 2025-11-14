# Multi-stage build para optimización

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

# Copiar package.json y lockfile
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN pnpm build

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

# Activar pnpm
RUN corepack enable && corepack prepare pnpm@10.22.0 --activate

# Copiar package.json y lockfile para instalar solo prod dependencies
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

# Copiar dist y node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Exponer puerto
EXPOSE 3001

# Health check opcional
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicio
CMD ["node", "dist/index.js"]
