
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface PortfolioFile {
  id: string;
  user_id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  category: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<PortfolioFile[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const uploadFile = async (
    file: File,
    category: string = 'general',
    description?: string,
    isPublic: boolean = true
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload files.",
        variant: "destructive",
      });
      return { success: false };
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save file metadata to database
      const { data, error: dbError } = await supabase
        .from('portfolio_files')
        .insert({
          user_id: user.id,
          filename: fileName,
          original_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          category,
          description,
          is_public: isPublic
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });

      // Refresh files list
      await fetchFiles();

      return { success: true, data };
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    } finally {
      setUploading(false);
    }
  };

  const fetchFiles = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_files')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast({
        title: "Error loading files",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('portfolio-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('portfolio_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "File deleted successfully",
        description: "The file has been removed.",
      });

      // Refresh files list
      await fetchFiles();

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const getFileUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('portfolio-files')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };

  return {
    uploading,
    loading,
    files,
    uploadFile,
    fetchFiles,
    deleteFile,
    getFileUrl
  };
};
