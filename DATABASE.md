# Database Setup

This project now includes a PostgreSQL database running in Docker. Here's what has been configured:

## Files Created/Modified

### 1. `docker-compose.yml`

- PostgreSQL 15 container
- Database name: `app_starter`
- Username: `postgres`
- Password: `password`
- Port: `5432` (mapped to localhost)
- Persistent data volume: `postgres_data`
- Health check enabled

### 2. `.env` (updated)

- Added `DATABASE_URL` for PostgreSQL connection
- Added PostgreSQL configuration variables

### 3. `.dockerignore`

- Optimizes Docker builds by excluding unnecessary files

## Usage

### Starting the Database

```bash
# Start PostgreSQL in the background
docker compose up -d postgres

# Check if it's running
docker compose ps
```

### Stopping the Database

```bash
# Stop the database
docker compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker compose down -v
```

### Connecting to the Database

#### Using Docker

```bash
# Connect using psql in the container
docker compose exec postgres psql -U postgres -d app_starter

# Run SQL commands directly
docker compose exec postgres psql -U postgres -d app_starter -c "SELECT version();"
```

#### Using External Tools

You can connect to the database using any PostgreSQL client with these credentials:

- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `app_starter`
- **Username:** `postgres`
- **Password:** `password`

#### From Your Application

The `DATABASE_URL` in your `.env` file is already configured:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/app_starter"
```

## Drizzle ORM Integration

Since you have `drizzle-kit` installed, you can run database migrations:

```bash
# Generate migrations (if you have schema changes)
npx drizzle-kit generate

# Push schema changes to database
npx drizzle-kit push

# Open Drizzle Studio to view your data
npx drizzle-kit studio
```

## Security Notes

⚠️ **Important:** The current setup uses default credentials for development. For production:

1. Change the database password
2. Use environment variables for sensitive data
3. Enable SSL/TLS
4. Restrict network access
5. Use secrets management

## Next Steps

1. Define your database schema in `src/db/schema.ts`
2. Generate and run migrations
3. Start building your application with the database connection
