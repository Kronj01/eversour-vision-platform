
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SearchResult {
  id: string;
  content_type: 'blog_post' | 'page' | 'service' | 'portfolio';
  content_id: string;
  title: string;
  content: string;
  url: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export const useSearch = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const search = async (query: string, filters?: {
    content_type?: string[];
    tags?: string[];
  }) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      let queryBuilder = supabase
        .from('search_index')
        .select('*')
        .textSearch('search_vector', query, {
          type: 'websearch',
          config: 'english'
        });

      // Apply filters
      if (filters?.content_type && filters.content_type.length > 0) {
        queryBuilder = queryBuilder.in('content_type', filters.content_type);
      }

      if (filters?.tags && filters.tags.length > 0) {
        queryBuilder = queryBuilder.overlaps('tags', filters.tags);
      }

      const { data, error } = await queryBuilder
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setResults(data || []);
    } catch (error: any) {
      console.error('Error searching:', error);
      toast({
        title: "Search failed",
        description: error.message,
        variant: "destructive",
      });
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const addToSearchIndex = async (
    contentType: 'blog_post' | 'page' | 'service' | 'portfolio',
    contentId: string,
    title: string,
    content: string,
    url: string,
    tags: string[] = []
  ) => {
    try {
      const { error } = await supabase
        .from('search_index')
        .upsert({
          content_type: contentType,
          content_id: contentId,
          title,
          content,
          url,
          tags
        }, {
          onConflict: 'content_type,content_id'
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error adding to search index:', error);
    }
  };

  const removeFromSearchIndex = async (contentType: string, contentId: string) => {
    try {
      const { error } = await supabase
        .from('search_index')
        .delete()
        .eq('content_type', contentType)
        .eq('content_id', contentId);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error removing from search index:', error);
    }
  };

  return {
    results,
    loading,
    search,
    addToSearchIndex,
    removeFromSearchIndex
  };
};
