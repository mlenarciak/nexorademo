#!/bin/bash

# next-forge Environment Setup Script
# This script creates .env.local files for each app with placeholder values

set -e

echo "🚀 next-forge Environment Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to create env file
create_env_file() {
  local file_path=$1
  local content=$2
  
  if [ -f "$file_path" ]; then
    echo -e "${YELLOW}⚠️  $file_path already exists. Skipping...${NC}"
  else
    echo "$content" > "$file_path"
    echo -e "${GREEN}✅ Created $file_path${NC}"
  fi
}

# apps/app/.env.local
APP_ENV="# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_CLERK_PUBLISHABLE_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Resend Email
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_REPLACE_WITH_YOUR_RESEND_TOKEN"

create_env_file "apps/app/.env.local" "$APP_ENV"

# apps/api/.env.local
API_ENV="# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_CLERK_WEBHOOK_SECRET
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_WITH_YOUR_CLERK_PUBLISHABLE_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Resend Email
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_REPLACE_WITH_YOUR_RESEND_TOKEN

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_REPLACE_WITH_YOUR_STRIPE_WEBHOOK_SECRET"

create_env_file "apps/api/.env.local" "$API_ENV"

# apps/web/.env.local
WEB_ENV="# Core URLs (REQUIRED)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3002

# Resend Email
RESEND_FROM=onboarding@resend.dev
RESEND_TOKEN=re_REPLACE_WITH_YOUR_RESEND_TOKEN

# BaseHub CMS
BASEHUB_TOKEN=bshb_pk_REPLACE_WITH_YOUR_BASEHUB_TOKEN"

create_env_file "apps/web/.env.local" "$WEB_ENV"

echo ""
echo "================================"
echo -e "${GREEN}✅ Environment files created!${NC}"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Sign up for required services:"
echo "   - Clerk: https://dashboard.clerk.com"
echo "   - Resend: https://resend.com"
echo "   - BaseHub: https://basehub.com/basehub/next-forge?fork=1"
echo "   - Stripe: https://dashboard.stripe.com"
echo ""
echo "2. Replace placeholder values in these files:"
echo "   - apps/app/.env.local"
echo "   - apps/api/.env.local"
echo "   - apps/web/.env.local"
echo ""
echo "3. Configure database in packages/database/.env"
echo ""
echo "4. Run database migrations:"
echo "   pnpm run migrate"
echo ""
echo "5. Start development server:"
echo "   pnpm run dev"
echo ""
echo "📖 See SETUP_GUIDE.md for detailed instructions"
echo ""


