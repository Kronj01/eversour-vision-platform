
import { useState, useEffect } from 'react';
import { seoApi } from '@/api/endpoints';
import { SEOData } from '@/api/types';
import { useToast } from '@/hooks/use-toast';

export const useSEO = () => {
  const [data, setData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSEOData = async () => {
    try {
      setLoading(true);
      const seoData = await seoApi.getSEOData();
      setData(seoData);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error fetching SEO data",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSEOData();
  }, []);

  return { data, loading, error, refetch: fetchSEOData };
};
