# 🐳 Docker & Dokploy Deployment

Complete Docker setup for deploying the Go Learning Platform to Dokploy.

## 📦 What's Included

- **Dockerfile** - Multi-stage production build
- **docker-compose.yml** - PostgreSQL + Next.js app
- **deploy-local.sh** - Local testing script
- **.dockerignore** - Optimized build context
- **.env.production** - Production environment template

## 🚀 Quick Start (Local Testing)

### 1. Test locally with Docker Compose:

```bash
# Build and start everything
./deploy-local.sh

# Or manually:
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### 2. Initialize the database:

1. Go to http://localhost:3000/admin/tutorials
2. Login with credentials from `.env.production`
3. Click "🗄️ Инициализировать БД"

### 3. Test the application:

- Homepage: http://localhost:3000
- Tutorials: http://localhost:3000/tutorials
- Register: http://localhost:3000/auth/register
- Login: http://localhost:3000/auth/login

## 🌐 Deploy to Dokploy

### Prerequisites

- Dokploy instance running
- Domain: `school.vova4o.com` pointed to your server
- SSH access to server

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Docker configuration"
git push origin main
```

### Step 2: Create Application in Dokploy

1. Login to Dokploy dashboard
2. Click **"New Application"**
3. Select **"Docker Compose"**
4. Name: `webschool`

### Step 3: Configure Git

- Repository: `https://github.com/Vova4o/webschool`
- Branch: `main`
- Build path: `/` (root)
- Compose file: `docker-compose.yml`

### Step 4: Set Environment Variables

In Dokploy, add these environment variables:

```env
# Database
POSTGRES_DB=webschool
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_very_secure_password_here

# NextAuth - GENERATE NEW SECRET!
NEXTAUTH_SECRET=generate_new_with_openssl_rand_base64_32
NEXTAUTH_URL=https://school.vova4o.com

# Admin Panel
ADMIN_USER=admin
ADMIN_PASSWORD=your_secure_admin_password_here

# Node
NODE_ENV=production
```

**🔐 Generate new secrets:**

```bash
# For NEXTAUTH_SECRET
openssl rand -base64 32

# For passwords, use strong random strings
openssl rand -base64 24
```

### Step 5: Configure Domain & SSL

In Dokploy application settings:

- **Domain**: `school.vova4o.com`
- **SSL/TLS**: Enable (Let's Encrypt)
- **Port**: `3000`

### Step 6: Deploy

1. Click **"Deploy"** in Dokploy
2. Wait for build to complete (~5-10 minutes)
3. Check deployment logs for errors

### Step 7: Initialize Database

After successful deployment:

1. Visit `https://school.vova4o.com/admin/tutorials`
2. Login with Basic Auth (ADMIN_USER/ADMIN_PASSWORD)
3. Click "🗄️ Инициализировать БД" button

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Dokploy Server              │
│  ┌───────────────────────────────┐  │
│  │     Docker Compose            │  │
│  │  ┌─────────────┐              │  │
│  │  │   Nginx     │              │  │
│  │  │   Proxy     │ :443         │  │
│  │  └──────┬──────┘              │  │
│  │         │                     │  │
│  │  ┌──────▼──────┐              │  │
│  │  │  Next.js    │              │  │
│  │  │  App        │ :3000        │  │
│  │  └──────┬──────┘              │  │
│  │         │                     │  │
│  │  ┌──────▼──────┐              │  │
│  │  │ PostgreSQL  │              │  │
│  │  │  Database   │ :5432        │  │
│  │  └─────────────┘              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## 📊 Docker Services

### 1. **postgres** (Database)

- Image: `postgres:15-alpine`
- Port: `5432`
- Volume: `postgres_data` (persisted)
- Health check: Every 10 seconds

### 2. **app** (Next.js Application)

- Built from: `Dockerfile`
- Port: `3000`
- Depends on: `postgres`
- Health check: Every 30 seconds

## 🔧 Management Commands

### View Logs

```bash
# All services
docker-compose logs -f

# Just app
docker-compose logs -f app

# Just database
docker-compose logs -f postgres
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart app only
docker-compose restart app

# Restart database only
docker-compose restart postgres
```

### Database Access

```bash
# Connect to PostgreSQL
docker exec -it webschool-db psql -U postgres -d webschool

# Backup database
docker exec webschool-db pg_dump -U postgres webschool > backup-$(date +%Y%m%d).sql

# Restore database
docker exec -i webschool-db psql -U postgres webschool < backup.sql
```

### Container Management

```bash
# List containers
docker-compose ps

# View resource usage
docker stats webschool-app webschool-db

# Stop all
docker-compose down

# Stop and remove volumes (⚠️ DELETES DATA)
docker-compose down -v
```

## 🐛 Troubleshooting

### Application won't start

```bash
# Check logs
docker-compose logs app

# Check if database is ready
docker exec webschool-db pg_isready -U postgres

# Restart app
docker-compose restart app
```

### Database connection errors

```bash
# Check POSTGRES_URL environment variable
docker exec webschool-app env | grep POSTGRES_URL

# Test database connection
docker exec webschool-db psql -U postgres -d webschool -c "SELECT 1"
```

### Build fails

```bash
# Clean build
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Out of disk space

```bash
# Remove unused Docker resources
docker system prune -a

# Check disk usage
docker system df
```

## 🔒 Security Checklist

Before production deployment:

- [ ] Generate new `NEXTAUTH_SECRET`
- [ ] Change `POSTGRES_PASSWORD` from default
- [ ] Change `ADMIN_PASSWORD` from default
- [ ] Use strong, random passwords (20+ characters)
- [ ] Enable SSL certificate in Dokploy
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Enable Docker health checks
- [ ] Set up monitoring/alerts

## 📈 Performance Tips

1. **Database Connection Pooling**: Already configured in `@vercel/postgres`

2. **Next.js Optimization**: Standalone output enabled

3. **Container Resources**: Add in `docker-compose.yml`:

   ```yaml
   app:
     deploy:
       resources:
         limits:
           cpus: "2"
           memory: 2G
   ```

4. **Database Tuning**: Add to postgres service:
   ```yaml
   command: postgres -c max_connections=200 -c shared_buffers=256MB
   ```

## 🔄 Updates & Rollbacks

### Deploy Updates

**Option 1: Through Dokploy**

1. Push changes to GitHub
2. Click "Redeploy" in Dokploy dashboard

**Option 2: Manual**

```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

### Rollback

```bash
# Find previous image
docker images

# Tag and use previous image
docker tag webschool-app:previous webschool-app:latest
docker-compose up -d
```

## 📦 Backup Strategy

### Automated Backups

Create cron job on server:

```bash
# Edit crontab
crontab -e

# Add daily backup at 3 AM
0 3 * * * docker exec webschool-db pg_dump -U postgres webschool > /backups/webschool-$(date +\%Y\%m\%d).sql
```

### Manual Backup

```bash
# Create backup
docker exec webschool-db pg_dump -U postgres webschool > backup.sql

# Compress backup
gzip backup.sql

# Download from server (from local machine)
scp user@server:/path/to/backup.sql.gz ./
```

## 🎯 Production URLs

After deployment, verify:

- ✅ Homepage: https://school.vova4o.com
- ✅ Tutorials: https://school.vova4o.com/tutorials
- ✅ Login: https://school.vova4o.com/auth/login
- ✅ Register: https://school.vova4o.com/auth/register
- ✅ Admin: https://school.vova4o.com/admin/tutorials

## 📞 Support

For detailed deployment guide, see: `DOKPLOY_DEPLOYMENT.md`

For issues:

- Check logs: `docker-compose logs`
- Check health: `docker-compose ps`
- Restart: `docker-compose restart`
