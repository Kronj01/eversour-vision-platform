import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'page' | 'custom' | 'category';
  target?: '_blank' | '_self';
  children?: MenuItem[];
  order: number;
  icon?: string;
  description?: string;
}

export interface Menu {
  id: string;
  name: string;
  location: string;
  items: MenuItem[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useMenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menus')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMenus((data || []) as unknown as Menu[]);
    } catch (error: any) {
      console.error('Error fetching menus:', error);
      toast({
        title: "Error loading menus",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createMenu = async (menuData: Omit<Menu, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('menus')
        .insert(menuData as any)
        .select()
        .single();

      if (error) throw error;

      await fetchMenus(); // Refresh the list
      toast({
        title: "Menu created",
        description: `Menu "${menuData.name}" has been created.`,
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to create menu",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateMenu = async (menuId: string, menuData: Partial<Menu>) => {
    try {
      const { data, error } = await supabase
        .from('menus')
        .update(menuData as any)
        .eq('id', menuId)
        .select()
        .single();

      if (error) throw error;

      await fetchMenus(); // Refresh the list
      toast({
        title: "Menu updated",
        description: "Menu has been successfully updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to update menu",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteMenu = async (menuId: string) => {
    try {
      const { error } = await supabase
        .from('menus')
        .delete()
        .eq('id', menuId);

      if (error) throw error;

      await fetchMenus(); // Refresh the list
      toast({
        title: "Menu deleted",
        description: "Menu has been successfully deleted.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete menu",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateMenuItems = async (menuId: string, items: MenuItem[]) => {
    try {
      const { data, error } = await supabase
        .from('menus')
        .update({ items: items as any })
        .eq('id', menuId)
        .select()
        .single();

      if (error) throw error;

      await fetchMenus(); // Refresh the list
      toast({
        title: "Menu items updated",
        description: "Menu structure has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      toast({
        title: "Failed to update menu items",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const getMenuByLocation = (location: string) => {
    return menus.find(menu => menu.location === location && menu.is_active);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    loading,
    fetchMenus,
    createMenu,
    updateMenu,
    deleteMenu,
    updateMenuItems,
    getMenuByLocation
  };
};