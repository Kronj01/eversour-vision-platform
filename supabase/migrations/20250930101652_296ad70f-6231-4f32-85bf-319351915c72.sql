-- Add missing RLS policies for admin notifications
CREATE POLICY "Admins can create notifications for any user" 
ON public.notifications 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Update notifications table to allow null user_id for system notifications
ALTER TABLE public.notifications ALTER COLUMN user_id DROP NOT NULL;

-- Add policy for system notifications (no user_id)
CREATE POLICY "Allow system notifications" 
ON public.notifications 
FOR SELECT 
USING (user_id IS NULL);