# Stickly

Arabic-first e-commerce platform for stickers, custom printed designs, business cards, and posters. Built with Next.js App Router and prepared for Vercel + Supabase.

## Local development

```bash
npm install
npm run dev
```

Run validation:

```bash
npm test
npm run build
```

## Production order system

Orders are created through a server-side Next.js API. Product prices are recalculated on the server; browser totals are not trusted. Checkout supports:

- Algerian mobile numbers: `05`, `06`, `07`, and `+213` forms.
- Searchable list of all 58 wilayas.
- Manual commune entry, clearly used because this repository does not include a verified, complete commune dataset.
- Configurable Wilaya delivery fees.
- Cash on delivery (COD).
- Idempotency keys to prevent duplicate submissions.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and provide the listed values. Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser or commit it.
3. Run [`supabase/migrations/20261125_stickly_orders.sql`](supabase/migrations/20261125_stickly_orders.sql) in the Supabase SQL editor or through the Supabase CLI.
4. Configure a delivery fee for every Wilaya you want to accept, for example:

```sql
insert into public.delivery_fees (wilaya_code, fee_dzd)
values ('16', 600)
on conflict (wilaya_code) do update set fee_dzd = excluded.fee_dzd;
```

5. Create an administrator in **Supabase Authentication** with email/password, then insert that user’s UUID into `admin_users`:

```sql
insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
```

The `/admin` route requires that authenticated user to be present in `admin_users`. It provides order search, status filtering, order details, and secure status updates.

## Vercel deployment

Add the three variables from `.env.example` to Vercel’s Production environment settings, deploy, and configure delivery fees before enabling checkout. The database integration is intentionally unavailable until these values are configured; the checkout will show an honest configuration error instead of silently storing orders locally.

## Limits of the design studio MVP

The studio supports editable text, uploaded images, templates, decorative elements, previews, and cart integration. Export currently downloads editable design JSON. Print-ready raster/PDF/CMYK rendering would require a dedicated server-side rendering pipeline and is not represented as completed functionality.
