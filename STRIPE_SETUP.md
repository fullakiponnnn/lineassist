# Stripe Setup Guide

## 1. Database Migration
Run the SQL in `migration_add_stripe_columns.sql` in your Supabase SQL Editor.

## 2. Environment Variables
Add the following to your `.env.local` (and Vercel environment variables):

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Product Price IDs (Create these in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD_YEARLY=price_...
```

## 3. Webhook Setup
When you deploy, set your webhook URL in Stripe to:
`https://your-domain.com/api/webhook/stripe`

Listen for these events:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `customer.subscription.deleted`
