# Dokploy Deployment Guide

This application is configured to run on Dokploy with Docker Compose.

## Prerequisites

- Dokploy instance running
- Domain pointed to your Dokploy server (school.vova4o.com)
- SSH access to your server

## Deployment Steps

### 1. Create Application in Dokploy

1. Login to your Dokploy dashboard
2. Create a new **Docker Compose** application
3. Name it: `webschool`

### 2. Configure Git Repository

- Repository: `https://github.com/Vova4o/webschool`
- Branch: `main`
- Auto-deploy: Enable (optional)

### 3. Set Environment Variables in Dokploy

Go to application settings and add these environment variables:

```env
# Database
POSTGRES_DB=webschool
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD_HERE

# NextAuth (IMPORTANT: Generate new secret!)
NEXTAUTH_SECRET=YOUR_NEW_SECRET_HERE
NEXTAUTH_URL=https://school.vova4o.com

# Admin Panel
ADMIN_USER=admin
ADMIN_PASSWORD=YOUR_SECURE_ADMIN_PASSWORD
```

**Generate new NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 4. Configure Domain

In Dokploy application settings:

- Add domain: `school.vova4o.com`
- Enable SSL/TLS (Let's Encrypt)
- Port: `3000`

### 5. Deploy

Click **Deploy** in Dokploy dashboard.

The deployment will:

1. Build the Next.js application
2. Start PostgreSQL database
3. Start the web application
4. Wait for database health check
5. Connect application to database

### 6. Initialize Database

After first deployment:

1. Go to `https://school.vova4o.com/admin/tutorials`
2. Login with Basic Auth (ADMIN_USER/ADMIN_PASSWORD)
3. Click "🗄️ Инициализировать БД" button
4. Confirm initialization

This will:

- Create database tables (users, tutorials)
- Seed initial tutorial data

### 7. Verify Deployment

Test these URLs:

- Homepage: `https://school.vova4o.com`
- Tutorials: `https://school.vova4o.com/tutorials`
- Admin: `https://school.vova4o.com/admin/tutorials`
- Login: `https://school.vova4o.com/auth/login`

## Container Management

### View Logs

```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Restart Containers

```bash
docker-compose restart
```

### Stop All

```bash
docker-compose down
```

### Rebuild and Restart

```bash
docker-compose up -d --build
```

## Database Access

### Connect to PostgreSQL

```bash
docker exec -it webschool-db psql -U postgres -d webschool
```

### Backup Database

```bash
docker exec webschool-db pg_dump -U postgres webschool > backup.sql
```

### Restore Database

```bash
docker exec -i webschool-db psql -U postgres webschool < backup.sql
```

## Troubleshooting

### Container Not Starting

```bash
# Check logs
docker-compose logs app

# Check health
docker-compose ps
```

### Database Connection Issues

```bash
# Test database connection
docker exec webschool-app env | grep POSTGRES_URL

# Check database is running
docker exec webschool-db pg_isready -U postgres
```

### Application Errors

```bash
# View real-time logs
docker-compose logs -f app

# Restart application
docker-compose restart app
```

### Reset Everything

```bash
# Stop and remove everything including volumes
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

## Production Checklist

Before going live, ensure:

- [ ] Changed POSTGRES_PASSWORD from default
- [ ] Generated new NEXTAUTH_SECRET
- [ ] Changed ADMIN_PASSWORD from default
- [ ] Configured domain in Dokploy
- [ ] SSL certificate is active
- [ ] Database is initialized
- [ ] Tested user registration
- [ ] Tested admin panel access
- [ ] Set up database backups

## Monitoring

### Check Application Health

```bash
curl https://school.vova4o.com/
```

### Check Database Health

```bash
docker exec webschool-db pg_isready -U postgres
```

### Container Stats

```bash
docker stats webschool-app webschool-db
```

## Scaling

To scale the application:

```bash
docker-compose up -d --scale app=3
```

Note: Add a load balancer in front of multiple app instances.

## Updates

To update the application:

1. Push changes to GitHub
2. In Dokploy: Click **Redeploy**
3. Or SSH to server and run:
   ```bash
   docker-compose pull
   docker-compose up -d --build
   ```

## Support

For issues:

- Check logs: `docker-compose logs`
- Restart services: `docker-compose restart`
- Contact: your-email@example.com
