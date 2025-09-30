import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  file_type: 'image' | 'video' | 'audio' | 'document' | 'other';
  dimensions?: { width: number; height: number };
  metadata: Record<string, any>;
  is_optimized: boolean;
  cdn_url?: string;
  folder_path: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface MediaStats {
  total: number;
  images: number;
  videos: number;
  documents: number;
  totalSize: number;
}

export const useMediaManagement = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<MediaStats>({
    total: 0,
    images: 0,
    videos: 0,
    documents: 0,
    totalSize: 0
  });
  const { toast } = useToast();

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMediaFiles((data || []) as MediaFile[]);

      // Calculate stats
      const total = data?.length || 0;
      const images = data?.filter(file => file.file_type === 'image').length || 0;
      const videos = data?.filter(file => file.file_type === 'video').length || 0;
      const documents = data?.filter(file => file.file_type === 'document').length || 0;
      const totalSize = data?.reduce((sum, file) => sum + file.file_size, 0) || 0;

      setStats({ total, images, videos, documents, totalSize });
    } catch (error: any) {
      console.error('Error fetching media files:', error);
      toast({
        title: "Error loading media files",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (
    file: File,
    folder: string = '/',
    metadata?: Record<string, any>
  ) => {
    try {
      setUploading(true);
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Determine file type
      const getFileType = (mimeType: string): MediaFile['file_type'] => {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.startsWith('audio/')) return 'audio';
        if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document';
        return 'other';
      };

      // Get dimensions for images
      let dimensions;
      if (file.type.startsWith('image/')) {
        dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
          img.src = URL.createObjectURL(file);
        });
      }

      // Save metadata to database
      const { data, error } = await supabase
        .from('media_files')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: uploadData.path,
          file_size: file.size,
          mime_type: file.type,
          file_type: getFileType(file.type),
          dimensions,
          metadata: metadata || {},
          folder_path: folder,
          uploaded_by: user.user.id
        })
        .select()
        .single();

      if (error) throw error;

      await fetchMediaFiles(); // Refresh the list
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to upload file",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setUploading(false);
    }
  };

  const updateFileMetadata = async (
    fileId: string, 
    metadata: Partial<Pick<MediaFile, 'alt_text' | 'caption' | 'description'>>
  ) => {
    try {
      const { data, error } = await supabase
        .from('media_files')
        .update(metadata)
        .eq('id', fileId)
        .select()
        .single();

      if (error) throw error;

      await fetchMediaFiles(); // Refresh the list
      toast({
        title: "File updated",
        description: "File metadata has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to update file",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      const file = mediaFiles.find(f => f.id === fileId);
      if (!file) throw new Error('File not found');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('public-assets')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error } = await supabase
        .from('media_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;

      await fetchMediaFiles(); // Refresh the list
      toast({
        title: "File deleted",
        description: "File has been successfully deleted.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete file",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('public-assets')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  return {
    mediaFiles,
    loading,
    uploading,
    stats,
    fetchMediaFiles,
    uploadFile,
    updateFileMetadata,
    deleteFile,
    getFileUrl
  };
};