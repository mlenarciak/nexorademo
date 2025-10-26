# 🚀 Quick Start Guide

**You're almost there!** Here's the fastest path to get your next-forge project running.

## ✅ What You Already Have

- ✅ Clerk Secret Key
- ✅ BaseHub Token  
- ✅ Database URL (Neon PostgreSQL)
- ✅ Project initialized

## ❌ What You Still Need

You need to get **3 API keys** (takes ~10 minutes total):

### 1. Clerk Publishable Key (2 min)
Already have secret key, just need the publishable key.

### 2. Resend API Token (3 min)
For sending emails. Free tier: 100/day.

### 3. Stripe Secret Key (3 min)
For payments (API app only). Test mode is free.

---

## 📋 Step-by-Step Instructions

### Step 1: Get Missing API Keys

#### A. Clerk Publishable Key
1. Go to https://dashboard.clerk.com
2. Click **API Keys** in sidebar
3. Copy **Publishable key** (starts with `pk_test_`)
4. Save it for Step 2

#### B. Resend API Key
1. Go to https://resend.com
2. Sign up (free account, no credit card)
3. Click **API Keys** → **Create API Key**
4. Name it "next-forge-dev"
5. Copy the key (starts with `re_`)
6. Save it for Step 2

#### C. Stripe Secret Key
1. Go to https://dashboard.stripe.com
2. Sign up (test mode is free)
3. Go to **Developers** → **API keys** (top right)
4. Copy **Secret key** (starts with `sk_test_`)
5. Save it for Step 2

### Step 2: Update Environment Files

Open these files and add the missing values:

**apps/app/.env.local:**
```bash
# Add these lines:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_FROM_STEP_1A
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_YOUR_KEY_FROM_STEP_1B
```

**apps/api/.env.local:**
```bash
# Add these lines:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_FROM_STEP_1A
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_YOUR_KEY_FROM_STEP_1B
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_FROM_STEP_1C
STRIPE_WEBHOOK_SECRET=whsec_test_placeholder
```

**apps/web/.env.local:**
```bash
# Add these lines:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_YOUR_KEY_FROM_STEP_1B
```

### Step 3: Start the Development Server

```bash
pnpm run dev
```

### Step 4: Test Your Apps

Open these URLs in your browser:

- **Main App:** http://localhost:3000
- **Marketing Site:** http://localhost:3001  
- **API Health:** http://localhost:3002/health

---

## 🎯 Quick Commands

```bash
# Open all env files at once
code apps/app/.env.local apps/api/.env.local apps/web/.env.local

# Or with nano (one at a time)
nano apps/app/.env.local

# Start development
pnpm run dev

# Start just one app
pnpm --filter app dev
pnpm --filter web dev
pnpm --filter api dev
```

---

## ❓ About Clerk Webhook Secret

**Q: What is `CLERK_WEBHOOK_SECRET`?**  
A: A secret key that verifies webhook requests from Clerk.

**Q: Do I need a real one?**  
A: Not for local development! Use the placeholder: `whsec_test_local_placeholder`

**Q: When do I need a real one?**  
A: Only when deploying to production or testing webhooks locally.

**Q: How do I get a real one?**  
A: See `CLERK_WEBHOOK_SETUP.md` for detailed instructions.

---

## 📚 Additional Resources

Created for you:

- **SETUP_GUIDE.md** - Complete setup guide for all services
- **CLERK_WEBHOOK_SETUP.md** - Detailed Clerk webhook setup
- **ENV_TEMPLATES.md** - Copy-paste ready templates
- **scripts/fix-env.sh** - Diagnostic tool to check your config

---

## 🐛 Troubleshooting

### "Invalid environment variables" error

**Check:**
1. All keys start with correct prefixes:
   - Clerk: `sk_test_`, `pk_test_`, `whsec_`
   - Resend: `re_`
   - Stripe: `sk_test_`, `whsec_`
2. No empty quotes: `SOME_VAR=""` ← Bad
3. URLs are complete: `http://localhost:3000` ← Good

### "Webhook secret" errors

Use placeholder values:
```bash
CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder
STRIPE_WEBHOOK_SECRET=whsec_test_placeholder
```

### Specific app failing

Start apps individually to isolate the issue:
```bash
pnpm --filter app dev    # Main app
pnpm --filter web dev    # Marketing site
pnpm --filter api dev    # API server
```

### Database issues

```bash
# Run migrations
pnpm run migrate

# Check database connection
echo $DATABASE_URL
```

---

## 🎉 Success Checklist

After `pnpm run dev` runs successfully, you should see:

- ✅ **app#dev** - Running on http://localhost:3000
- ✅ **web#dev** - Running on http://localhost:3001
- ✅ **api#dev** - Running on http://localhost:3002
- ✅ **email#dev** - Running on http://localhost:3003
- ⚠️ **docs#dev** - May fail (requires Mintlify CLI)
- ⚠️ **storybook#dev** - May fail (optional)
- ⚠️ **studio#dev** - May fail (optional)
- ⚠️ **@repo/cms#dev** - Should work (you have BaseHub token)

**Don't worry if some services fail** - as long as app, web, and api start, you're good to go!

---

## 🚦 Next Steps After Running

1. **Test authentication:**
   - Visit http://localhost:3000
   - Click "Sign Up"
   - Create a test account

2. **Test the marketing site:**
   - Visit http://localhost:3001
   - Navigate around
   - Try the contact form (uses Resend)

3. **Check API health:**
   - Visit http://localhost:3002/health
   - Should see `{ "ok": true }`

4. **Read the docs:**
   - Full setup guide: `cat SETUP_GUIDE.md`
   - Clerk webhooks: `cat CLERK_WEBHOOK_SETUP.md`

---

## 💡 Pro Tips

- **Use placeholder webhooks for local dev** - You don't need real webhook secrets
- **Resend test email** - `onboarding@resend.dev` works without domain verification
- **Stripe test mode** - All test keys are free, no credit card needed
- **Database** - Neon free tier is perfect for development
- **Optional services** - Skip BetterStack, Sentry, etc. for now

---

## 🆘 Still Stuck?

Run the diagnostic tool:
```bash
./scripts/fix-env.sh
```

Or check your current configuration:
```bash
cat apps/app/.env.local | grep -v "^#"
cat apps/api/.env.local | grep -v "^#"
cat apps/web/.env.local | grep -v "^#"
```

---

**You've got this!** 🚀

The hard part (project setup, database config) is done. Just grab those 3 API keys and you're ready to build!

