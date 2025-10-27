# Database Connection Fix

## Issue: "Can't reach database server"

This error occurs when:
1. **Neon database is sleeping** (serverless databases auto-pause)
2. Connection timed out
3. Network connectivity issue

## ✅ Quick Fix

### Option 1: Restart Dev Server (Recommended)

```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
pnpm dev
```

This forces a fresh database connection and wakes up Neon.

### Option 2: Wake Up Database Manually

```bash
cd packages/database
pnpm prisma studio
```

This will wake up the Neon database, then visit your app.

### Option 3: Test Database Connection

```bash
cd packages/database
pnpm db:studio
```

If Prisma Studio loads (http://localhost:5555), your database is working!

## 🔍 What's Happening

**Neon Serverless**:
- Databases auto-pause after ~5 minutes of inactivity
- First connection wakes it up (takes ~1-3 seconds)
- Subsequent connections are fast

**The Error**:
```
Can't reach database server at ep-jolly-field-agoq9svt-pooler...
```

This is normal for sleeping databases!

## ✅ After Restart

You should see:
```
✅ Database connection established
✅ Properties load successfully
✅ No more "Can't reach database" errors
```

---

## 🎯 **TRY THIS NOW:**

1. **Stop dev server**: Press `Ctrl+C`
2. **Restart**: `pnpm dev`
3. **Wait 10-15 seconds** (database wakes up)
4. **Visit**: http://localhost:3000/properties
5. **✅ Should work!**

The database just needs to wake up from sleep mode!

