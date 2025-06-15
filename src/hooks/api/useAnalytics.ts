
import { useState, useEffect } from 'react';
import { analyticsApi } from '@/api/endpoints';
import { Analytics } from '@/api/types';
import { useToast } from '@/hooks/use-toast';

export const useAnalytics = (timeframe: string = '30d') => {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const analytics = await analyticsApi.getAnalytics(timeframe);
        setData(analytics);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: "Error fetching analytics",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe, toast]);

  return { data, loading, error };
};
