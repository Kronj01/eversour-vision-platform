import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ContentItem {
  id: string;
  title: string;
  type: 'page' | 'blog' | 'media' | 'video';
  status: 'draft' | 'review' | 'published' | 'archived';
  content: string;
  meta_title: string;
  meta_description: string;
  slug: string;
  featured_image: string;
  tags: string[];
  author?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  view_count?: number;
}

export interface ContentStats {
  total: number;
  published: number;
  drafts: number;
  pages: number;
  blogs: number;
  media: number;
}

export const useContentManagement = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ContentStats>({
    total: 0,
    published: 0,
    drafts: 0,
    pages: 0,
    blogs: 0,
    media: 0
  });
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      // Mock data for demonstration
      const mockContent: ContentItem[] = [
        {
          id: '1',
          title: 'About Eversour',
          type: 'page',
          status: 'published',
          content: 'Eversour is a next-generation digital solutions company...',
          meta_title: 'About Eversour - Digital Solutions Company',
          meta_description: 'Learn about Eversour and our commitment to innovative digital solutions.',
          slug: 'about',
          featured_image: '/images/about-hero.jpg',
          tags: ['company', 'about'],
          author: 'Admin',
          created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
          updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
          published_at: new Date(Date.now() - 86400000 * 25).toISOString(),
          view_count: 1250
        }
      ];

      setContent(mockContent);
      setStats({
        total: mockContent.length,
        published: mockContent.filter(item => item.status === 'published').length,
        drafts: mockContent.filter(item => item.status === 'draft').length,
        pages: mockContent.filter(item => item.type === 'page').length,
        blogs: mockContent.filter(item => item.type === 'blog').length,
        media: mockContent.filter(item => item.type === 'media' || item.type === 'video').length
      });
    } catch (error: any) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error loading content",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newContent: ContentItem = {
        ...contentData,
        id: Math.random().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        view_count: 0
      };

      setContent(prev => [newContent, ...prev]);
      toast({
        title: "Content created",
        description: `${contentData.type.charAt(0).toUpperCase() + contentData.type.slice(1)} "${contentData.title}" has been created.`,
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to create content",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateContent = async (contentId: string, contentData: Partial<ContentItem>) => {
    try {
      setContent(prev => prev.map(item => 
        item.id === contentId 
          ? { ...item, ...contentData, updated_at: new Date().toISOString() }
          : item
      ));

      toast({
        title: "Content updated",
        description: "Content has been successfully updated.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to update content",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      setContent(prev => prev.filter(item => item.id !== contentId));
      toast({
        title: "Content deleted",
        description: "Content has been successfully deleted.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete content",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return {
    content,
    loading,
    stats,
    fetchContent,
    createContent,
    updateContent,
    deleteContent
  };
};