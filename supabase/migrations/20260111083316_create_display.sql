-- Table to store current pixel state (32x8 display)
create table if not exists display_pixels (
  x smallint not null check (x >= 0 and x <= 31),
  y smallint not null check (y >= 0 and y <= 7),
  color text not null check (color ~ '^#[0-9a-fA-F]{6}$'),
  updated_at timestamptz not null default now(),
  primary key (x, y)
);

-- Enable Row Level Security
alter table display_pixels enable row level security;

-- Allow all users to read pixels
create policy "Anyone can read pixels"
  on display_pixels for select
  using (true);

-- Allow all users to insert/update pixels (you can restrict this later)
create policy "Anyone can update pixels"
  on display_pixels for insert
  with check (true);

create policy "Anyone can modify pixels"
  on display_pixels for update
  using (true);

-- Enable Realtime
alter publication supabase_realtime add table display_pixels;

-- Function to automatically update the updated_at timestamp
create or replace function update_display_pixels_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to update updated_at on each update
create trigger set_display_pixels_updated_at
  before update on display_pixels
  for each row
  execute function update_display_pixels_updated_at();

