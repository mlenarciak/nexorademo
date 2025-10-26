#!/bin/bash

# Script to help fix environment variable issues

echo "🔍 Checking environment variables..."
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================"
echo "apps/app/.env.local"
echo "================================"
echo ""

echo -e "${GREEN}✅ Found:${NC}"
echo "   - CLERK_SECRET_KEY (starts with sk_test_)"
echo "   - BASEHUB_TOKEN (starts with bshb_pk_)"
echo "   - DATABASE_URL"
echo ""

echo -e "${RED}❌ Missing or Invalid:${NC}"
echo ""
echo "1. Add these REQUIRED variables:"
cat << 'EOF'

# Add to apps/app/.env.local:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001  
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

EOF

echo "2. For CLERK_WEBHOOK_SECRET, choose ONE option:"
echo ""
echo "   Option A (Easiest for local dev):"
echo "   CLERK_WEBHOOK_SECRET=whsec_test_local_placeholder"
echo ""
echo "   Option B (Remove/comment it completely):"
echo "   # CLERK_WEBHOOK_SECRET="
echo ""
echo "   Option C (Set up real webhook via Clerk Dashboard + ngrok):"
echo "   See CLERK_WEBHOOK_SETUP.md"
echo ""

echo "3. Set up Resend (REQUIRED):"
cat << 'EOF'

# Get free API key from https://resend.com
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_YOUR_RESEND_API_KEY_HERE

EOF

echo ""
echo "================================"
echo "apps/api/.env.local"
echo "================================"
echo ""

echo -e "${RED}❌ Same issues as apps/app, PLUS:${NC}"
echo ""
echo "4. Add Stripe keys (REQUIRED for api):"
cat << 'EOF'

# Get from https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_KEY_HERE

# For webhooks, run: pnpm --filter api dev
# The Stripe CLI will generate this automatically
# OR use placeholder: whsec_test_placeholder

EOF

echo ""
echo "================================"
echo "apps/web/.env.local"
echo "================================"
echo ""

echo -e "${GREEN}✅ Found:${NC}"
echo "   - BASEHUB_TOKEN"
echo ""

echo -e "${RED}❌ Missing or Invalid:${NC}"
echo ""
echo "5. Add these REQUIRED variables:"
cat << 'EOF'

# Add to apps/web/.env.local:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Resend (REQUIRED for contact forms)
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_YOUR_RESEND_API_KEY_HERE

EOF

echo ""
echo "================================"
echo "📝 Quick Actions"
echo "================================"
echo ""
echo "Open files to edit:"
echo "  nano apps/app/.env.local"
echo "  nano apps/api/.env.local"
echo "  nano apps/web/.env.local"
echo ""
echo "Or use your preferred editor:"
echo "  code apps/app/.env.local"
echo "  vim apps/app/.env.local"
echo ""
echo "================================"
echo "🚀 Sign Up for Services"
echo "================================"
echo ""
echo "1. Clerk (Auth): https://dashboard.clerk.com"
echo "   → Get publishable key (pk_test_...)"
echo ""
echo "2. Resend (Email): https://resend.com"
echo "   → Get API key (re_...)"
echo "   → Free tier: 100 emails/day"
echo ""
echo "3. Stripe (Payments): https://dashboard.stripe.com"
echo "   → Get test secret key (sk_test_...)"
echo ""
echo "================================"
echo "📖 Detailed Guides"
echo "================================"
echo ""
echo "• Full setup guide: cat SETUP_GUIDE.md"
echo "• Clerk webhooks: cat CLERK_WEBHOOK_SETUP.md"
echo ""


