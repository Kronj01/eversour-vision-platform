import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: string;
  template: string;
  status: 'draft' | 'published' | 'archived';
  parent_id?: string;
  sort_order: number;
  custom_fields: Record<string, any>;
  seo_settings: Record<string, any>;
  visibility: 'public' | 'private' | 'password';
  password?: string;
  scheduled_at?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface PageStats {
  total: number;
  published: number;
  drafts: number;
  archived: number;
}

export const usePageManagement = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PageStats>({
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0
  });
  const { toast } = useToast();

  const fetchPages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPages((data || []) as Page[]);
      
      // Calculate stats
      const total = data?.length || 0;
      const published = data?.filter(page => page.status === 'published').length || 0;
      const drafts = data?.filter(page => page.status === 'draft').length || 0;
      const archived = data?.filter(page => page.status === 'archived').length || 0;

      setStats({ total, published, drafts, archived });
    } catch (error: any) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Error loading pages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('pages')
        .insert({
          ...pageData,
          author_id: user.user.id
        })
        .select()
        .single();

      if (error) throw error;

      await fetchPages(); // Refresh the list
      toast({
        title: "Page created",
        description: `Page "${pageData.title}" has been created.`,
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to create page",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updatePage = async (pageId: string, pageData: Partial<Page>) => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', pageId)
        .select()
        .single();

      if (error) throw error;

      await fetchPages(); // Refresh the list
      toast({
        title: "Page updated",
        description: "Page has been successfully updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to update page",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deletePage = async (pageId: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      await fetchPages(); // Refresh the list
      toast({
        title: "Page deleted",
        description: "Page has been successfully deleted.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete page",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const duplicatePage = async (pageId: string) => {
    try {
      const page = pages.find(p => p.id === pageId);
      if (!page) throw new Error('Page not found');

      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const duplicatedPage = {
        ...page,
        title: `${page.title} (Copy)`,
        slug: `${page.slug}-copy-${Date.now()}`,
        status: 'draft' as const,
        author_id: user.user.id
      };

      delete (duplicatedPage as any).id;
      delete (duplicatedPage as any).created_at;
      delete (duplicatedPage as any).updated_at;

      return await createPage(duplicatedPage);
    } catch (error: any) {
      toast({
        title: "Failed to duplicate page",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    stats,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    duplicatePage
  };
};