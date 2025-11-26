# 🚀 Dokploy Deployment Checklist

## Pre-Deployment Steps

### 1. ✅ Code is Ready

- [x] NextAuth.js integrated
- [x] Premium content system implemented
- [x] Database schema created
- [x] Admin panel protected
- [x] Docker configuration complete
- [x] BuildKit optimizations enabled
- [x] TypeScript errors fixed
- [x] ESLint passing
- [x] Build successful

### 2. 🔐 Generate Secrets

Run these commands and save the output:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate POSTGRES_PASSWORD
openssl rand -base64 24

# Generate ADMIN_PASSWORD
openssl rand -base64 16
```

### 3. 📦 Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Add Docker setup, NextAuth, premium content system"

# Push to main
git push origin main
```

### 4. 🌐 Dokploy Configuration

#### Create Application:

1. Login to Dokploy dashboard
2. Click "New Application"
3. Select "Docker Compose"
4. Name: `webschool`

#### Configure Git:

- Repository: `https://github.com/Vova4o/webschool`
- Branch: `main`
- Build path: `/`
- Compose file: `docker-compose.yml`

#### Set Environment Variables:

```env
# Database
POSTGRES_DB=webschool
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<paste-generated-password>

# NextAuth
NEXTAUTH_SECRET=<paste-generated-secret>
NEXTAUTH_URL=https://school.vova4o.com

# Admin Panel
ADMIN_USER=admin
ADMIN_PASSWORD=<paste-generated-password>

# Node
NODE_ENV=production
```

#### Configure Domain:

- Domain: `school.vova4o.com`
- SSL/TLS: Enable (Let's Encrypt)
- Port: `3000`

### 5. 🚀 Deploy

1. Click "Deploy" in Dokploy
2. Wait for build (~5-8 minutes first time)
3. Monitor deployment logs

### 6. 🗄️ Initialize Database

After successful deployment:

1. Go to: `https://school.vova4o.com/admin/tutorials`
2. Login with Basic Auth:
   - Username: `admin`
   - Password: `<your-ADMIN_PASSWORD>`
3. Click "🗄️ Инициализировать БД" button
4. Confirm initialization

### 7. ✅ Verify Deployment

Test these URLs:

- [ ] Homepage: https://school.vova4o.com
- [ ] Tutorials: https://school.vova4o.com/tutorials
- [ ] Register: https://school.vova4o.com/auth/register
- [ ] Login: https://school.vova4o.com/auth/login
- [ ] Admin: https://school.vova4o.com/admin/tutorials
- [ ] Pricing: https://school.vova4o.com/pricing

### 8. 🎯 Post-Deployment

- [ ] Create test user account
- [ ] Create test tutorial via admin
- [ ] Mark tutorial as premium (uncheck "Free")
- [ ] Verify premium lock works
- [ ] Set up automated backups

## 📊 Quick Commands

### Push to GitHub:

```bash
git add .
git commit -m "Deploy to Dokploy"
git push origin main
```

### View Logs (SSH to server):

```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Restart Services:

```bash
docker-compose restart
```

### Database Backup:

```bash
docker exec webschool-db pg_dump -U postgres webschool > backup.sql
```

## 🔍 Troubleshooting

### Build fails:

- Check environment variables are set
- Verify GitHub repo is accessible
- Check Dokploy logs

### Database connection error:

- Ensure POSTGRES_URL is correctly formatted
- Wait for database health check to pass
- Check postgres container logs

### Can't access site:

- Verify domain DNS points to Dokploy server
- Check SSL certificate is issued
- Ensure port 3000 is exposed

## 📞 Support

For detailed guides, see:

- `DOKPLOY_DEPLOYMENT.md` - Full deployment guide
- `DOCKER_README.md` - Docker configuration
- `NEXTAUTH_SETUP.md` - Authentication setup
- `BUILDKIT.md` - Build optimization

---

Ready to deploy? Run:

```bash
git add . && git commit -m "Ready for Dokploy" && git push origin main
```

Then configure in Dokploy dashboard! 🚀
