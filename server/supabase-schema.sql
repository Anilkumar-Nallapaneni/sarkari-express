-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR SARKARI EXPRESS
-- =====================================================
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id BIGSERIAL PRIMARY KEY,
    source VARCHAR(100),
    title VARCHAR(500) NOT NULL,
    organization VARCHAR(300),
    department VARCHAR(300),
    state VARCHAR(100),
    state_code VARCHAR(50),
    posts INTEGER,
    education VARCHAR(300),
    salary VARCHAR(200),
    deadline DATE,
    notification_date DATE,
    exam_date VARCHAR(100),
    category VARCHAR(100),
    badge VARCHAR(50),
    is_urgent BOOLEAN DEFAULT false,
    application_fee JSONB,
    age_min INTEGER,
    age_max INTEGER,
    description TEXT,
    apply_steps JSONB,
    official_link TEXT,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_title ON public.jobs(title);
CREATE INDEX IF NOT EXISTS idx_jobs_state ON public.jobs(state);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_deadline ON public.jobs(deadline);
CREATE INDEX IF NOT EXISTS idx_jobs_fetched_at ON public.jobs(fetched_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Enable read access for all users" ON public.jobs
    FOR SELECT USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Enable insert for authenticated users" ON public.jobs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for service role to do everything
-- (This is handled automatically by Supabase)

-- =====================================================
-- Optional: Create a function to get latest jobs
-- =====================================================

CREATE OR REPLACE FUNCTION get_latest_jobs(limit_count INTEGER DEFAULT 50)
RETURNS SETOF public.jobs AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.jobs
    ORDER BY fetched_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Optional: Create a function to get jobs by state
-- =====================================================

CREATE OR REPLACE FUNCTION get_jobs_by_state(state_name VARCHAR)
RETURNS SETOF public.jobs AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.jobs
    WHERE state = state_name
    ORDER BY fetched_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Optional: Create a function to get upcoming deadline jobs
-- =====================================================

CREATE OR REPLACE FUNCTION get_upcoming_jobs(days_ahead INTEGER DEFAULT 7)
RETURNS SETOF public.jobs AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.jobs
    WHERE deadline >= CURRENT_DATE
      AND deadline <= CURRENT_DATE + (days_ahead || ' days')::INTERVAL
    ORDER BY deadline ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Optional: Create a view for dashboard statistics
-- =====================================================

CREATE OR REPLACE VIEW public.jobs_stats AS
SELECT 
    state,
    category,
    COUNT(*) as total_jobs,
    COUNT(CASE WHEN is_urgent = true THEN 1 END) as urgent_jobs,
    MAX(fetched_at) as last_updated
FROM public.jobs
GROUP BY state, category;

-- =====================================================
-- Optional: Create a table for job sources tracking
-- =====================================================

CREATE TABLE IF NOT EXISTS public.job_sources (
    id BIGSERIAL PRIMARY KEY,
    source_name VARCHAR(100) NOT NULL,
    source_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    last_fetch TIMESTAMP WITH TIME ZONE,
    jobs_fetched INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default sources
INSERT INTO public.job_sources (source_name, source_url, is_active) VALUES
    ('Sarkari Result', 'https://www.sarkariresult.com', true),
    ('Rojgar Result', 'https://www.rojgarresult.com', true),
    ('FreshersLive', 'https://www.fresherslive.com', true),
    ('IndiaBix', 'https://www.indiabix.com', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- Optional: Create a table for fetch logs
-- =====================================================

CREATE TABLE IF NOT EXISTS public.fetch_logs (
    id BIGSERIAL PRIMARY KEY,
    fetch_date DATE DEFAULT CURRENT_DATE,
    fetch_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(100),
    jobs_fetched INTEGER DEFAULT 0,
    status VARCHAR(50),
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fetch logs
CREATE INDEX IF NOT EXISTS idx_fetch_logs_date ON public.fetch_logs(fetch_date DESC);

-- =====================================================
-- Optional: Create a function to log fetch activity
-- =====================================================

CREATE OR REPLACE FUNCTION log_fetch_activity(
    p_source VARCHAR,
    p_jobs_fetched INTEGER,
    p_status VARCHAR,
    p_error_message TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.fetch_logs (source, jobs_fetched, status, error_message)
    VALUES (p_source, p_jobs_fetched, p_status, p_error_message);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Grant permissions (adjust as needed)
-- =====================================================

GRANT ALL ON TABLE public.jobs TO authenticated;
GRANT ALL ON TABLE public.jobs TO anon;
GRANT ALL ON TABLE public.job_sources TO authenticated;
GRANT ALL ON TABLE public.job_sources TO anon;
GRANT ALL ON TABLE public.fetch_logs TO authenticated;
GRANT ALL ON TABLE public.fetch_logs TO anon;
GRANT ALL ON FUNCTION public.get_latest_jobs TO authenticated;
GRANT ALL ON FUNCTION public.get_latest_jobs TO anon;
GRANT ALL ON FUNCTION public.get_jobs_by_state TO authenticated;
GRANT ALL ON FUNCTION public.get_jobs_by_state TO anon;
GRANT ALL ON FUNCTION public.get_upcoming_jobs TO authenticated;
GRANT ALL ON FUNCTION public.get_upcoming_jobs TO anon;
GRANT ALL ON FUNCTION public.log_fetch_activity TO authenticated;
GRANT ALL ON FUNCTION public.log_fetch_activity TO anon;

-- =====================================================
-- Done! Your database is ready.
-- =====================================================