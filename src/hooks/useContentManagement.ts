
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PageContent {
  id: string;
  page_path: string;
  page_title: string;
  meta_description: string;
  meta_keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  content_blocks: ContentBlock[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  type: 'hero' | 'text' | 'image' | 'video' | 'cta' | 'testimonial' | 'features';
  content: any;
  order: number;
  visible: boolean;
}

export interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  alt_text?: string;
  caption?: string;
  uploaded_at: string;
}

export const useContentManagement = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockPages: PageContent[] = [
      {
        id: '1',
        page_path: '/',
        page_title: 'Eversour - Next-Generation Digital Solutions',
        meta_description: 'Transform your business with cutting-edge digital solutions',
        meta_keywords: ['digital solutions', 'web development', 'software'],
        og_title: 'Eversour - Digital Solutions',
        og_description: 'Transform your business with cutting-edge digital solutions',
        og_image: '/images/og-home.jpg',
        content_blocks: [],
        published: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
        page_path: '/about',
        page_title: 'About Eversour',
        meta_description: 'Learn about our mission and team',
        meta_keywords: ['about', 'team', 'mission'],
        og_title: 'About Eversour',
        og_description: 'Learn about our mission and team',
        og_image: '/images/og-about.jpg',
        content_blocks: [],
        published: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-10T15:30:00Z',
      },
    ];

    const mockMedia: MediaAsset[] = [
      {
        id: '1',
        filename: 'hero-bg.jpg',
        url: '/images/hero-bg.jpg',
        type: 'image',
        size: 1024000,
        alt_text: 'Hero background image',
        uploaded_at: '2024-01-01T00:00:00Z',
      },
    ];

    setPages(mockPages);
    setMediaAssets(mockMedia);
    setLoading(false);
  }, []);

  const updatePageContent = async (pageId: string, updates: Partial<PageContent>) => {
    try {
      setPages(prev => prev.map(page => 
        page.id === pageId 
          ? { ...page, ...updates, updated_at: new Date().toISOString() }
          : page
      ));
      toast({
        title: "Page updated successfully",
        description: "The page content has been updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const uploadMedia = async (file: File) => {
    try {
      // Mock upload - replace with actual upload logic
      const newAsset: MediaAsset = {
        id: Date.now().toString(),
        filename: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: file.size,
        uploaded_at: new Date().toISOString(),
      };

      setMediaAssets(prev => [newAsset, ...prev]);
      toast({
        title: "Media uploaded successfully",
        description: "The file has been uploaded and is ready to use.",
      });
      return newAsset;
    } catch (error: any) {
      toast({
        title: "Error uploading media",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    pages,
    mediaAssets,
    loading,
    updatePageContent,
    uploadMedia,
  };
};
