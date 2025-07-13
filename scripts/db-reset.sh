#!/bin/bash

set -e

echo "🗑️  Stopping and removing existing containers and volumes..."
docker compose down -v

echo "🚀 Starting PostgreSQL container..."
docker compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if docker exec app-starter-postgres pg_isready -U postgres > /dev/null 2>&1; then
        echo "✅ PostgreSQL is ready!"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        echo "❌ PostgreSQL failed to start after $max_attempts attempts"
        exit 1
    fi
    
    echo "   Attempt $attempt/$max_attempts - waiting 2 seconds..."
    sleep 2
    ((attempt++))
done

echo "🔄 Running database migrations..."
npm run db:migrate

echo "🎉 Database reset completed successfully!"