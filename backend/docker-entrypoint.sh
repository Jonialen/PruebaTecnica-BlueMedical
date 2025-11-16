#!/bin/sh
set -e

echo "Esperando que la base de datos esté lista..."
sleep 5

echo "Ejecutando migraciones de Prisma..."
npx prisma migrate deploy

echo "Migraciones completadas"

echo "Ejecutando seed (opcional, solo en desarrollo)"
if [ "$NODE_ENV" = "development" ]; then
    echo "Sembrando datos de prueba..."
    npm run seed:prod || echo "Seed falló o ya se ejecutó"
fi

echo "Iniciando aplicación..."
exec "$@"