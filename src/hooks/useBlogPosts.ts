
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  reading_time: number | null;
  view_count: number | null;
  author?: {
    full_name: string | null;
    email: string;
  };
  categories?: {
    id: string;
    name: string;
    color: string;
  }[];
}

interface CreateBlogPostData {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  category_ids?: string[];
  published_at?: string | null;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles!author_id(full_name, email),
          categories:blog_post_categories(
            blog_categories!category_id(id, name, color)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        author: post.author,
        categories: post.categories?.map(cat => cat.blog_categories).filter(Boolean) || []
      })) as BlogPost[];

      setPosts(transformedPosts);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data: CreateBlogPostData) => {
    try {
      // Generate slug from title
      const slug = data.title.toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      // Calculate reading time (approximately 200 words per minute)
      const wordCount = data.content.split(' ').length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));

      const postData = {
        title: data.title,
        slug: slug,
        content: data.content,
        excerpt: data.excerpt || null,
        featured_image: data.featured_image || null,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        tags: data.tags || null,
        reading_time: readingTime,
        status: data.status || 'draft',
        published_at: data.published_at || (data.status === 'published' ? new Date().toISOString() : null),
        author_id: (await supabase.auth.getUser()).data.user?.id
      };

      const { data: post, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;

      // Add categories if provided
      if (data.category_ids && data.category_ids.length > 0) {
        const categoryRelations = data.category_ids.map(categoryId => ({
          post_id: post.id,
          category_id: categoryId
        }));

        const { error: categoryError } = await supabase
          .from('blog_post_categories')
          .insert(categoryRelations);

        if (categoryError) throw categoryError;
      }

      toast({
        title: "Post created successfully!",
        description: `"${data.title}" has been created as a ${data.status || 'draft'}.`,
      });

      await fetchPosts();
      return { success: true, post };
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updatePost = async (id: string, data: Partial<CreateBlogPostData>) => {
    try {
      const updateData: any = { ...data };
      
      // Update reading time if content changed
      if (data.content) {
        const wordCount = data.content.split(' ').length;
        updateData.reading_time = Math.max(1, Math.round(wordCount / 200));
      }

      // Set published_at if status changes to published
      if (data.status === 'published' && !data.published_at) {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post updated successfully!",
        description: "Your changes have been saved.",
      });

      await fetchPosts();
      return { success: true };
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast({
        title: "Failed to update post",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post deleted successfully!",
        description: "The post has been permanently removed.",
      });

      await fetchPosts();
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast({
        title: "Failed to delete post",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost
  };
};
