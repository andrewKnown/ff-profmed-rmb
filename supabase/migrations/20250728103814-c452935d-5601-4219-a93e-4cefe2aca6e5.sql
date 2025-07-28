-- Create profession_content table for storing theme-specific content
CREATE TABLE public.profession_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profession TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profession_faqs table for storing profession-specific FAQs
CREATE TABLE public.profession_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profession TEXT NOT NULL UNIQUE,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profession_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profession_faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (content should be publicly viewable)
CREATE POLICY "Content is publicly readable" 
ON public.profession_content 
FOR SELECT 
USING (true);

CREATE POLICY "FAQs are publicly readable" 
ON public.profession_faqs 
FOR SELECT 
USING (true);

-- Create policies for insert/update (you can restrict this later if needed)
CREATE POLICY "Anyone can insert profession content" 
ON public.profession_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update profession content" 
ON public.profession_content 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can insert profession FAQs" 
ON public.profession_faqs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update profession FAQs" 
ON public.profession_faqs 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profession_content_updated_at
    BEFORE UPDATE ON public.profession_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profession_faqs_updated_at
    BEFORE UPDATE ON public.profession_faqs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();