# NextAuth.js Integration - Complete Setup Guide

## 🎉 What's Been Implemented

I've successfully integrated **NextAuth.js v5** into your Go learning website with a complete user authentication and premium content system!

## 🔑 Features Added

### 1. **User Authentication**

- ✅ User registration with email and password
- ✅ Secure login with NextAuth.js
- ✅ Password hashing with bcryptjs
- ✅ JWT-based session management
- ✅ Protected routes and API endpoints

### 2. **Premium Content System**

- ✅ Free vs Premium tutorial distinction
- ✅ Access control based on user subscription status
- ✅ Premium badge display for locked content
- ✅ Expiration date tracking for premium subscriptions
- ✅ Admin role with full access

### 3. **UI Components**

- ✅ Login page (`/auth/login`)
- ✅ Registration page (`/auth/register`)
- ✅ User navigation component in navbar (shows name, premium badge, logout)
- ✅ Pricing page (`/pricing`)
- ✅ Premium content lock UI on tutorial pages

## 📁 Files Created/Modified

### New Files

```
src/auth.ts                              # NextAuth configuration
src/types/next-auth.d.ts                 # TypeScript type definitions
src/components/AuthProvider.tsx          # Session provider wrapper
src/components/UserNav.tsx               # User menu component
src/app/auth/login/page.tsx             # Login page
src/app/auth/register/page.tsx          # Registration page
src/app/api/auth/[...nextauth]/route.ts # NextAuth API route
src/app/api/auth/register/route.ts      # Registration API
src/app/pricing/page.tsx                # Pricing/plans page
.env.example                            # Environment variables template
```

### Modified Files

```
src/lib/db.ts                           # Added User model and auth functions
src/lib/seed.ts                         # Added is_free field to tutorials
src/middleware.ts                       # Updated for NextAuth compatibility
src/app/layout.tsx                      # Added AuthProvider wrapper
src/components/Navbar.tsx               # Added UserNav component
src/app/tutorials/[slug]/page.tsx       # Added premium content access control
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',        -- 'user' or 'admin'
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP,                -- NULL = lifetime, date = expiry
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tutorials Table (Updated)

```sql
CREATE TABLE tutorials (
  -- ... existing fields ...
  is_free BOOLEAN DEFAULT TRUE,           -- NEW: false = premium content
  -- ... existing fields ...
);
```

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database
POSTGRES_URL="your-postgres-connection-string"

# Admin Basic Auth (for /admin routes)
ADMIN_USER="admin"
ADMIN_PASSWORD="your-secure-password"

# NextAuth
NEXTAUTH_SECRET="ScMCVc3PGJzo7D/vdH82RteXrgq1cYEg1TViafsEDjY="
NEXTAUTH_URL="http://localhost:3000"
```

**Important:** For production, generate a new `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 2. Database Initialization

Once you have your database URL configured:

```bash
# Initialize tables and seed data
curl http://localhost:3000/api/init-db
```

This will create:

- Users table
- Updated tutorials table with `is_free` field
- Seed 2 free tutorials

### 3. Create Test Accounts

**Via Registration Page:**

1. Go to `http://localhost:3000/auth/register`
2. Fill in the form and create an account
3. Login at `http://localhost:3000/auth/login`

**Via Database (for testing premium):**

```sql
-- Create a premium user
INSERT INTO users (email, password_hash, name, role, is_premium, premium_until)
VALUES (
  'premium@test.com',
  '$2a$10$...',  -- Use bcrypt to hash 'password123'
  'Premium User',
  'user',
  true,
  '2026-12-31'
);

-- Create an admin user
INSERT INTO users (email, password_hash, name, role, is_premium)
VALUES (
  'admin@test.com',
  '$2a$10$...',  -- Use bcrypt to hash 'adminpass'
  'Admin User',
  'admin',
  false  -- Admins have access regardless
);
```

## 🎯 How It Works

### Authentication Flow

1. **Registration:**

   - User fills registration form
   - Password is hashed with bcryptjs (10 rounds)
   - User record created in database with role='user', is_premium=false
   - Redirect to login page

2. **Login:**

   - User provides email/password
   - NextAuth validates credentials against database
   - Creates JWT token with user data (id, role, isPremium, premiumUntil)
   - Session stored client-side

3. **Session Management:**
   - JWT token refreshed automatically
   - Session data available via `useSession()` (client) or `auth()` (server)
   - Logout clears session and redirects

### Access Control

```typescript
// Tutorial access logic (checkUserAccess function)
1. Is tutorial free (is_free=true)?
   → Everyone has access

2. Is user logged in?
   → No: Deny access, show login prompt
   → Yes: Continue to step 3

3. Is user an admin (role='admin')?
   → Yes: Grant access

4. Is user premium (is_premium=true)?
   → No: Deny access
   → Yes: Check expiration

5. Has premium expired (premium_until < now)?
   → Yes: Deny access
   → No: Grant access
```

### Protected Routes

- **Public:** `/`, `/tutorials`, `/auth/login`, `/auth/register`, `/pricing`
- **Free Tutorial Content:** Any tutorial with `is_free=true`
- **Premium Tutorial Content:** Requires login + premium subscription
- **Admin Routes:** `/admin/*` (still protected by Basic Auth)

## 🎨 UI Components

### UserNav Component

Located in navbar, shows:

- **Not logged in:** "Sign in" and "Sign up" buttons
- **Logged in:** Username, Premium badge (if premium), "Sign out" button

### Premium Lock UI

On premium tutorials when user doesn't have access:

- Lock icon
- "Premium Content" heading
- Contextual message:
  - Not logged in: "Sign in to access this premium tutorial"
  - Logged in (no premium): "This tutorial is available only for Premium subscribers"
  - Premium expired: "Your Premium subscription has expired"
- Action buttons (Login/Register or "Get Premium Access")

## 🚀 Testing the Integration

### Test User Registration

1. Go to `http://localhost:3000/auth/register`
2. Register: name="Test User", email="test@example.com", password="test123"
3. Should redirect to login page

### Test Login

1. Go to `http://localhost:3000/auth/login`
2. Login with credentials from registration
3. Should see your name in navbar with "Sign out" button

### Test Premium Content

1. Create a premium tutorial via admin panel:

   - Go to `/admin/tutorials/new`
   - Uncheck "Free Tutorial" checkbox
   - Create tutorial

2. As free user, navigate to that tutorial

   - Should see premium lock screen

3. Grant yourself premium in database:

```sql
UPDATE users
SET is_premium = true, premium_until = '2026-12-31'
WHERE email = 'test@example.com';
```

4. Refresh tutorial page
   - Should now see full content!

## 📝 API Endpoints

### NextAuth

- `GET/POST /api/auth/[...nextauth]` - NextAuth handlers (signin, callback, session, etc.)

### Custom Auth

- `POST /api/auth/register` - User registration
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123"
  }
  ```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 10)
- ✅ JWT tokens with secure secret
- ✅ HTTP-only cookies (when deployed to production)
- ✅ CSRF protection via NextAuth
- ✅ SQL injection protection via parameterized queries
- ✅ Dual authentication: NextAuth (users) + Basic Auth (admins)

## 📊 User Roles

### Regular User (`role='user'`)

- Can register and login
- Access to all free tutorials
- Access to premium tutorials if `is_premium=true` and not expired

### Premium User (`role='user'`, `is_premium=true`)

- All regular user permissions
- Access to premium tutorials
- Premium badge in UI
- Access until `premium_until` date (or forever if NULL)

### Admin User (`role='admin'`)

- Full access to all tutorials (regardless of is_free status)
- Access to admin panel (`/admin/*`)
- No premium required

## 🎬 Next Steps (Future Enhancements)

### Payment Integration

To enable actual premium subscriptions, integrate a payment provider:

**Option 1: Stripe**

```bash
npm install stripe @stripe/stripe-js
```

**Option 2: Paddle**

```bash
npm install @paddle/paddle-js
```

After payment success:

```typescript
await updateUserPremiumStatus(
  userId,
  true,
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
);
```

### Additional Features

- [ ] OAuth providers (Google, GitHub)
- [ ] Email verification
- [ ] Password reset flow
- [ ] User profile page
- [ ] Subscription management UI
- [ ] Premium analytics dashboard
- [ ] Tutorial progress tracking
- [ ] Certificates for course completion

## 🐛 Troubleshooting

### Error: "Invalid credentials"

- Check password is at least 6 characters
- Verify email exists in database
- Check password hash matches

### Error: "Database connection failed"

- Ensure `POSTGRES_URL` is set in `.env.local`
- Run database initialization: `curl http://localhost:3000/api/init-db`

### Session not persisting

- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again
- Check browser console for errors

### Premium lock showing when it shouldn't

- Verify user's `is_premium=true` in database
- Check `premium_until` date is in the future (or NULL)
- Verify tutorial's `is_free` field is set correctly

## 📖 Documentation

- **NextAuth.js:** https://next-auth.js.org/
- **Next.js 15:** https://nextjs.org/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres

## 🎉 You're All Set!

Your Go learning platform now has:

- Complete user authentication
- Premium content protection
- Role-based access control
- Modern, secure architecture

Ready for deployment! 🚀
