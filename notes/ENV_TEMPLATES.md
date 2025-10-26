# Environment Variable Templates

Copy these to your respective .env.local files.

## 📝 apps/app/.env.local

```bash
# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Database (Already configured ✅)
DATABASE_URL="postgresql://neondb_owner:npg_iQcG31JenMvg@ep-jolly-field-agoq9svt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Clerk Authentication (Partially configured)
CLERK_SECRET_KEY="sk_test_ioiM5fIdlgXaZDOfx7jUsCWTnSR4mmjmzJJwnmlfpQ"
CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=GET_FROM_CLERK_DASHBOARD
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Resend Email (REQUIRED)
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=GET_FROM_RESEND_COM

# BaseHub CMS (Already configured ✅)
BASEHUB_TOKEN="bshb_pk_sme0a3jlonmursid6ee77l4lsjzb5qpz444wumhseqpd3o9pbpaol2gta1pfdx3d"

# Optional Services (can leave empty for local dev)
FLAGS_SECRET=""
ARCJET_KEY=""
SVIX_TOKEN=""
LIVEBLOCKS_SECRET=""
KNOCK_API_KEY=""
KNOCK_FEED_CHANNEL_ID=""
KNOCK_SECRET_API_KEY=""
VERCEL_PROJECT_PRODUCTION_URL="http://localhost:3000"
```

## 📝 apps/api/.env.local

```bash
# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Database (Already configured ✅)
DATABASE_URL="postgresql://neondb_owner:npg_iQcG31JenMvg@ep-jolly-field-agoq9svt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Clerk Authentication
CLERK_SECRET_KEY="sk_test_ioiM5fIdlgXaZDOfx7jUsCWTnSR4mmjmzJJwnmlfpQ"
CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=GET_FROM_CLERK_DASHBOARD
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Resend Email (REQUIRED)
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=GET_FROM_RESEND_COM

# Stripe Payments (REQUIRED)
STRIPE_SECRET_KEY=GET_FROM_STRIPE_DASHBOARD
# Webhook secret is auto-generated when you run: pnpm --filter api dev
# Or use placeholder for now:
STRIPE_WEBHOOK_SECRET=whsec_test_placeholder

# BaseHub (Already configured ✅)
BASEHUB_TOKEN="bshb_pk_sme0a3jlonmursid6ee77l4lsjzb5qpz444wumhseqpd3o9pbpaol2gta1pfdx3d"

# Optional Services
FLAGS_SECRET=""
ARCJET_KEY=""
SVIX_TOKEN=""
LIVEBLOCKS_SECRET=""
KNOCK_API_KEY=""
KNOCK_FEED_CHANNEL_ID=""
VERCEL_PROJECT_PRODUCTION_URL="http://localhost:3002"
```

## 📝 apps/web/.env.local

```bash
# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Database (Already configured ✅)
DATABASE_URL="postgresql://neondb_owner:npg_iQcG31JenMvg@ep-jolly-field-agoq9svt-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Resend Email (REQUIRED for contact forms)
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=GET_FROM_RESEND_COM

# BaseHub CMS (Already configured ✅)
BASEHUB_TOKEN="bshb_pk_sme0a3jlonmursid6ee77l4lsjzb5qpz444wumhseqpd3o9pbpaol2gta1pfdx3d"

# Optional Services
FLAGS_SECRET=""
ARCJET_KEY=""
SVIX_TOKEN=""
LIVEBLOCKS_SECRET=""
KNOCK_API_KEY=""
KNOCK_FEED_CHANNEL_ID=""
VERCEL_PROJECT_PRODUCTION_URL="http://localhost:3001"
```

---

## 🚀 Action Items

### 1. Get Clerk Publishable Key (2 minutes)

1. Go to https://dashboard.clerk.com
2. Select your application
3. Click **API Keys** in sidebar
4. Copy the **Publishable Key** (starts with `pk_test_`)
5. Replace `GET_FROM_CLERK_DASHBOARD` in all three files

### 2. Get Resend API Key (2 minutes)

1. Go to https://resend.com
2. Sign up (free account)
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `re_`)
5. Replace `GET_FROM_RESEND_COM` in all three files

### 3. Get Stripe Secret Key (2 minutes) - For API only

1. Go to https://dashboard.stripe.com
2. Sign up (test mode is free)
3. Go to **Developers** → **API keys**
4. Copy **Secret key** (starts with `sk_test_`)
5. Replace `GET_FROM_STRIPE_DASHBOARD` in `apps/api/.env.local`

---

## 🎯 Clerk Webhook Secret - Detailed Answer

### What is it?
A secret key that verifies webhook requests from Clerk are legitimate.

### Where to get it?
**Clerk Dashboard** → **Webhooks** → **Add Endpoint** → Copy the **Signing Secret**

### Do I need it for local dev?
**No!** You can use a placeholder: `whsec_test_local_placeholder`

### When do I need a real one?
- When deploying to production
- When testing webhook functionality locally (requires ngrok)

### Setup for production:
1. Deploy your API to a public URL
2. Clerk Dashboard → Webhooks → Add Endpoint
3. URL: `https://your-api-domain.com/webhooks/auth`
4. Select events: `user.*`, `organization.*`, `organizationMembership.*`
5. Copy the signing secret

### Setup for local development (with ngrok):
```bash
# Terminal 1: Start ngrok
npx ngrok http 3002

# Terminal 2: Add webhook in Clerk Dashboard
# URL: https://xxxxx.ngrok.io/webhooks/auth

# Terminal 3: Start your app
pnpm run dev
```

---

## ⚡ Quick Copy Commands

```bash
# Open all three files at once
code apps/app/.env.local apps/api/.env.local apps/web/.env.local

# Or with nano
nano apps/app/.env.local
# Press Ctrl+X to exit, then open next file
nano apps/api/.env.local
nano apps/web/.env.local
```

---

## ✅ Checklist

- [ ] Copy templates from above to respective .env.local files
- [ ] Get Clerk publishable key from dashboard
- [ ] Get Resend API key (sign up at resend.com)
- [ ] Get Stripe secret key (sign up at stripe.com)
- [ ] Replace all `GET_FROM_...` placeholders
- [ ] Save all files
- [ ] Run: `pnpm run dev`

---

## 🆘 Still Having Issues?

```bash
# Check if variables are being read
cd apps/app && node -pe "require('fs').readFileSync('.env.local', 'utf8')"

# Look for common issues:
# - Empty quotes: SOME_VAR="" (should be removed or have value)
# - Wrong format: Keys not starting with required prefixes
# - Extra spaces or newlines
# - Windows line endings (CRLF vs LF)
```

