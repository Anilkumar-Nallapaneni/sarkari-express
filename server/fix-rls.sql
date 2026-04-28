-- =====================================================
-- FIX: Add anonymous insert policy for cron job
-- =====================================================
-- Run this in your Supabase SQL Editor to allow the cron job to insert jobs

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.jobs;

-- Create a new policy that allows anyone to insert (needed for cron job)
CREATE POLICY "Allow anonymous insert" ON public.jobs
    FOR INSERT WITH CHECK (true);

-- Also ensure the table can be updated
DROP POLICY IF EXISTS "Enable update for all users" ON public.jobs;
CREATE POLICY "Allow anonymous update" ON public.jobs
    FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for all users" ON public.jobs;
CREATE POLICY "Allow anonymous delete" ON public.jobs
    FOR DELETE USING (true);

-- Verify the policies
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'jobs';