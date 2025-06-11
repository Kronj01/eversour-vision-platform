
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  created_at: string;
}

export const useBlogCategories = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setCategories((data || []) as BlogCategory[]);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Error loading categories",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: { name: string; description?: string; color?: string }) => {
    try {
      // Generate slug from name
      const slug = data.name.toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      const { error } = await supabase
        .from('blog_categories')
        .insert([{
          name: data.name,
          slug: slug,
          description: data.description || null,
          color: data.color || '#6366f1'
        }]);

      if (error) throw error;

      toast({
        title: "Category created!",
        description: `"${data.name}" category has been added.`,
      });

      await fetchCategories();
      return { success: true };
    } catch (error: any) {
      console.error('Error creating category:', error);
      toast({
        title: "Failed to create category",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
    createCategory
  };
};
