create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.delivery_fees (
  wilaya_code text primary key check (wilaya_code ~ '^[0-9]{2}$'),
  fee_dzd integer not null check (fee_dzd >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  idempotency_key text not null unique,
  customer_name text not null check (char_length(customer_name) between 1 and 100),
  phone_normalized text not null check (phone_normalized ~ '^\+213[567][0-9]{8}$'),
  wilaya_code text not null references public.delivery_fees(wilaya_code),
  wilaya_name text not null,
  commune text not null check (char_length(commune) between 1 and 100),
  address text not null check (char_length(address) between 1 and 250),
  instructions text,
  subtotal integer not null check (subtotal >= 0),
  delivery_fee integer not null check (delivery_fee >= 0),
  total integer not null check (total >= 0),
  payment_method text not null default 'cod' check (payment_method in ('cod')),
  status text not null default 'pending' check (status in ('pending','confirmed','processing','shipped','delivered','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_key text not null,
  name text not null,
  description text,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity between 1 and 1000),
  product_snapshot jsonb not null default '{}'::jsonb
);

create or replace function public.create_order_with_items(p_order jsonb, p_items jsonb)
returns table (id uuid, reference text, subtotal integer, delivery_fee integer, total integer, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_order public.orders;
begin
  insert into public.orders (
    reference, idempotency_key, customer_name, phone_normalized, wilaya_code, wilaya_name,
    commune, address, instructions, subtotal, delivery_fee, total, payment_method, status
  ) values (
    p_order->>'reference', p_order->>'idempotency_key', p_order->>'customer_name', p_order->>'phone_normalized',
    p_order->>'wilaya_code', p_order->>'wilaya_name', p_order->>'commune', p_order->>'address',
    nullif(p_order->>'instructions',''), (p_order->>'subtotal')::integer, (p_order->>'delivery_fee')::integer,
    (p_order->>'total')::integer, 'cod', 'pending'
  ) returning * into new_order;

  insert into public.order_items (order_id, product_key, name, description, unit_price, quantity, product_snapshot)
  select new_order.id, item->>'product_key', item->>'name', item->>'description',
    (item->>'unit_price')::integer, (item->>'quantity')::integer, coalesce(item->'product_snapshot','{}'::jsonb)
  from jsonb_array_elements(p_items) as item;

  return query select new_order.id, new_order.reference, new_order.subtotal, new_order.delivery_fee, new_order.total, new_order.created_at;
end;
$$;
revoke all on function public.create_order_with_items(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.create_order_with_items(jsonb, jsonb) to service_role;

create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_phone_idx on public.orders(phone_normalized);
create index if not exists order_items_order_idx on public.order_items(order_id);

create or replace function public.set_updated_at() returns trigger language plpgsql security invoker as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
drop trigger if exists delivery_fees_updated_at on public.delivery_fees;
create trigger delivery_fees_updated_at before update on public.delivery_fees for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.delivery_fees enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

create policy "Admins can read admin_users" on public.admin_users for select to authenticated using (public.is_admin());
create policy "Anyone may read delivery availability" on public.delivery_fees for select using (true);
create policy "Admins manage delivery fees" on public.delivery_fees for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read orders" on public.orders for select to authenticated using (public.is_admin());
create policy "Admins update orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins read order items" on public.order_items for select to authenticated using (public.is_admin());

-- Create an Auth user in Supabase, then grant dashboard access once:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID_HERE');
-- Configure delivery fees before accepting orders, for example:
-- insert into public.delivery_fees (wilaya_code, fee_dzd) values ('16', 600);
