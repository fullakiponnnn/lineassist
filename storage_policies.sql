-- Storage Policies for 'visit-photos' bucket

-- 1. Create the bucket if it doesn't exist (NOTE: buckets are usually created via dashboard, but we can try inserting if permissions allow)
insert into storage.buckets (id, name, public)
values ('visit-photos', 'visit-photos', true)
on conflict (id) do nothing;

-- 2. Allow authenticated users (shops) to upload photos
create policy "Authenticated users can upload visit photos"
on storage.objects for insert
with check (
  bucket_id = 'visit-photos' and
  auth.role() = 'authenticated'
);

-- 3. Allow authenticated users to view photos (Own photos only is ideal, but for simplicity we start with authenticated view.
--    To make it strict, we would need to check against the visits table or folder structure)
--    Here we assume a folder structure like: {profile_id}/{customer_id}/{filename}
--    which allows us to enforce ownership via path.
create policy "Users can view their own folder photos"
on storage.objects for select
using (
  bucket_id = 'visit-photos' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their own folder photos"
on storage.objects for update
using (
  bucket_id = 'visit-photos' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own folder photos"
on storage.objects for delete
using (
  bucket_id = 'visit-photos' and
  auth.role() = 'authenticated' and
  (storage.foldername(name))[1] = auth.uid()::text
);
