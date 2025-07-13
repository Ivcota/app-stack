# App Starter

A modern full-stack web application built with Next.js, featuring authentication, database integration, and a beautiful UI.

## Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with shadcn/ui components
- **Authentication**: Better Auth with email/password
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Docker Compose for local database
- **UI Components**: Radix UI with Lucide icons

## Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm/yarn/pnpm/bun

## Getting Started

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp example.env .env
   ```
   Update the `.env` file with your database URL and other required variables.

3. **Start the database**
   ```bash
   npm run db:start
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management
- `npm run db:start` - Start PostgreSQL container
- `npm run db:stop` - Stop PostgreSQL container
- `npm run db:reset` - Reset database (runs custom script)
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate migration files
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── lib/             # Utility functions and configurations
├── db/              # Database schema and connection
└── auth.ts          # Authentication configuration
```

## Authentication

The app uses Better Auth for authentication with email/password. Users can sign up and sign in through the dedicated auth pages.

## Database

PostgreSQL database with Drizzle ORM for type-safe database operations. The database runs in a Docker container for easy local development.
