-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL, -- full-time, part-time, contract, internship
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT,
  benefits TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft, published, closed
  published_at TIMESTAMP WITH TIME ZONE,
  closes_at TIMESTAMP WITH TIME ZONE,
  application_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES public.job_postings(id) ON DELETE CASCADE NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  years_of_experience INTEGER,
  current_company TEXT,
  expected_salary TEXT,
  availability_date DATE,
  status TEXT NOT NULL DEFAULT 'new', -- new, screening, interview, offer, hired, rejected
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create interview schedules table
CREATE TABLE public.interview_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.job_applications(id) ON DELETE CASCADE NOT NULL,
  interview_type TEXT NOT NULL, -- phone, video, in-person, technical
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  location TEXT, -- physical address or video link
  interviewer_name TEXT,
  interviewer_email TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled', -- scheduled, completed, cancelled, rescheduled
  notes TEXT,
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tags table for candidate skills/attributes
CREATE TABLE public.candidate_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.job_applications(id) ON DELETE CASCADE NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_job_postings_status ON public.job_postings(status);
CREATE INDEX idx_job_postings_department ON public.job_postings(department);
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_interview_schedules_application_id ON public.interview_schedules(application_id);
CREATE INDEX idx_interview_schedules_scheduled_at ON public.interview_schedules(scheduled_at);

-- Enable RLS
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_postings
CREATE POLICY "Anyone can view published jobs"
  ON public.job_postings FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage all jobs"
  ON public.job_postings FOR ALL
  USING (is_admin());

-- RLS Policies for job_applications
CREATE POLICY "Anyone can submit applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all applications"
  ON public.job_applications FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update applications"
  ON public.job_applications FOR UPDATE
  USING (is_admin());

-- RLS Policies for interview_schedules
CREATE POLICY "Admins can manage interview schedules"
  ON public.interview_schedules FOR ALL
  USING (is_admin());

-- RLS Policies for candidate_tags
CREATE POLICY "Admins can manage candidate tags"
  ON public.candidate_tags FOR ALL
  USING (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON public.job_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_interview_schedules_updated_at
  BEFORE UPDATE ON public.interview_schedules
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();