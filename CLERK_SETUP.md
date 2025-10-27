# Clerk Authentication Setup for Nexora

## 🔐 Quick Setup (5 minutes)

### Step 1: Create Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Sign up for a free account
3. Click "+ Create Application"
4. Name it "Nexora" (or any name)
5. Choose your authentication methods:
   - ✅ **Email** (recommended)
   - ✅ **Google** (optional)
   - ✅ **GitHub** (optional)

### Step 2: Get Your API Keys

After creating your application:

1. Go to **API Keys** in the Clerk dashboard
2. You'll see two keys:
   - **Publishable Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)

### Step 3: Add Keys to .env.local

Update `/home/max/nexora/.env.local` with your Clerk keys:

```bash
# Database (already set)
DATABASE_URL="postgresql://..."

# Clerk Authentication - ADD THESE
CLERK_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# App URLs (already set)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WEB_URL="http://localhost:3001"
```

### Step 4: Configure Clerk Dashboard

In your Clerk dashboard:

1. **Go to Paths**:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/`
   - After sign-up: `/`

2. **Go to Sessions**:
   - Enable "Multi-session" if you want
   - Session lifetime: 7 days (recommended)

3. **Go to Restrictions** (Optional):
   - Add allowed domains: `localhost:3000`, `localhost:3001`

### Step 5: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
pnpm dev
```

### Step 6: Test Authentication

1. Visit: http://localhost:3000
2. You should be redirected to Clerk's sign-in page
3. Click "Sign up" to create an account
4. After signing up, you'll be redirected to `/properties`
5. You'll see your properties dashboard!

---

## 🎯 What You Get

After signing in with Clerk:

- ✅ `userId` - Your unique user ID
- ✅ `orgId` - Your organization ID (for multi-tenancy)
- ✅ `user` object - Full user profile
- ✅ Session management - Automatic
- ✅ Sign out - Built-in

---

## 🔍 Verification

After adding keys and restarting:

1. Visit http://localhost:3000
2. Should redirect to Clerk sign-in
3. Sign up with email
4. After sign-up, should redirect to `/` → `/properties`
5. You'll see:
   ```
   ✅ No "Unauthorized" error
   ✅ Properties list loads
   ✅ Can create, edit, delete properties
   ```

---

## ⚡ Quick Test

```bash
# After adding Clerk keys to .env.local:
1. Restart: pnpm dev
2. Visit: http://localhost:3000
3. Sign up with your email
4. ✅ Properties page loads!
```

---

## 🆘 Troubleshooting

### Still seeing "Unauthorized"?
- Check keys are in `.env.local` (NOT `.env.example`)
- Keys should have no quotes or spaces
- Restart dev server after adding keys

### Clerk not redirecting?
- Check `NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"`
- Check `NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"`
- Clear browser cache and try again

### Can't find API keys?
- Log into [dashboard.clerk.com](https://dashboard.clerk.com)
- Select your "Nexora" application
- Click "API Keys" in the left sidebar
- Copy the keys

---

## 📝 Environment Variables Needed

**Required for Clerk**:
```bash
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
```

**Optional but Recommended**:
```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
```

---

## ✅ Once Working

After Clerk is configured, you'll have:

- Full authentication flow
- User management
- Organization support (multi-tenancy)
- Profile management
- Secure sessions
- OAuth (if enabled)
- MFA support (if enabled)

All properties will be scoped to your organization automatically!

---

**Need help?** Check the [Clerk documentation](https://clerk.com/docs/quickstarts/nextjs)

