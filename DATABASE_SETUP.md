# Database Setup Instructions

## Overview

The application now uses PostgreSQL database for storing tutorial content dynamically.

## Setup Steps

### 1. Create Vercel Postgres Database

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to the "Storage" tab
4. Click "Create Database"
5. Select "Postgres"
6. Follow the prompts to create the database

### 2. Add Environment Variables

After creating the database, Vercel will provide connection strings. Add these to your `.env.local` file:

```env
POSTGRES_URL="************"
POSTGRES_PRISMA_URL="************"
POSTGRES_URL_NON_POOLING="************"
POSTGRES_USER="************"
POSTGRES_HOST="************"
POSTGRES_PASSWORD="************"
POSTGRES_DATABASE="************"
```

### 3. Initialize the Database

Run the initialization API endpoint to create the tables and seed initial data:

**Development:**

```bash
curl http://localhost:3000/api/init-db
```

**Production:**

```bash
curl https://your-domain.com/api/init-db
```

This will:

- Create the `tutorials` table
- Seed it with the existing tutorial content

### 4. Access Admin Interface

Navigate to `/admin/tutorials` to manage tutorials:

- View all tutorials
- Create new tutorials
- Edit existing tutorials
- Delete tutorials

## API Endpoints

### Public Endpoints

- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials/[slug]` - Get tutorial by slug

### Admin Endpoints

- `POST /api/tutorials` - Create new tutorial
- `PUT /api/tutorials/id/[id]` - Update tutorial
- `DELETE /api/tutorials/id/[id]` - Delete tutorial

## Database Schema

```sql
CREATE TABLE tutorials (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  level VARCHAR(100) NOT NULL,
  duration VARCHAR(50),
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Usage

### Creating a New Tutorial

1. Go to `/admin/tutorials`
2. Click "Добавить урок"
3. Fill in the form:
   - **Заголовок**: Tutorial title
   - **Slug**: URL-friendly identifier (e.g., "getting-started")
   - **Описание**: Short description
   - **Уровень**: Начинающий, Средний, or Продвинутый
   - **Длительность**: e.g., "30 мин"
   - **Категория**: basics or advanced
   - **Порядок**: Display order (0-100)
   - **Содержание**: Tutorial content in Markdown format
4. Click "Создать урок"

The tutorial will immediately appear on the `/tutorials` page and be accessible at `/tutorials/[slug]`.

## Features

- **Dynamic Content**: Add/edit tutorials without code changes
- **Markdown Support**: Write content in Markdown format
- **Categorization**: Organize tutorials by category
- **Ordering**: Control display order with the order field
- **ISR**: Pages revalidate every 60 seconds for optimal performance
- **Fallback**: If database is unavailable, falls back to hardcoded content

## Notes

- The `/api/init-db` endpoint should be called only once to set up the database
- Admin pages currently have no authentication (add NextAuth.js for production)
- Tutorial content uses simple Markdown parsing (consider react-markdown for production)
