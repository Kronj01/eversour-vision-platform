import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Segment {
  id: string;
  name: string;
  description?: string;
  conditions: any[];
  member_count: number;
  is_dynamic: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  description?: string;
  subscriber_count: number;
  created_at: string;
}

export const useSegmentation = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSegments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('segments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSegments((data || []) as Segment[]);
    } catch (error: any) {
      toast({
        title: "Error loading segments",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createSegment = async (segment: Partial<Segment>) => {
    try {
      const { data, error } = await supabase
        .from('segments')
        .insert([segment] as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Segment created",
        description: `${segment.name} has been created successfully.`
      });

      await fetchSegments();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating segment",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteSegment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('segments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Segment deleted",
        description: "Segment has been deleted successfully."
      });

      await fetchSegments();
    } catch (error: any) {
      toast({
        title: "Error deleting segment",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const fetchTags = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      setTags(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading tags",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (tag: Partial<Tag>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([tag] as any)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Tag created",
        description: `${tag.name} has been created successfully.`
      });

      await fetchTags();
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating tag",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const addTagToSubscriber = async (email: string, tagId: string) => {
    try {
      const { error} = await supabase
        .from('subscriber_tags')
        .insert({
          email,
          tag_id: tagId
        });

      if (error) throw error;

      toast({
        title: "Tag added",
        description: "Tag has been added to subscriber."
      });
    } catch (error: any) {
      toast({
        title: "Error adding tag",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const addMemberToSegment = async (segmentId: string, email: string, metadata?: any) => {
    try {
      const { error } = await supabase
        .from('segment_members')
        .insert({
          segment_id: segmentId,
          email,
          metadata: metadata || {}
        });

      if (error) throw error;

      toast({
        title: "Member added",
        description: "Member has been added to segment."
      });
    } catch (error: any) {
      toast({
        title: "Error adding member",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    segments,
    tags,
    loading,
    fetchSegments,
    createSegment,
    deleteSegment,
    fetchTags,
    createTag,
    addTagToSubscriber,
    addMemberToSegment
  };
};
