import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryGlow: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    destructive: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  layout: {
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  components: {
    button: {
      defaultStyle: string;
      variants: Record<string, string>;
    };
    card: {
      defaultStyle: string;
      variants: Record<string, string>;
    };
    input: {
      defaultStyle: string;
      variants: Record<string, string>;
    };
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      linear: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComponentPreset {
  name: string;
  component: string;
  props: Record<string, any>;
  style: Record<string, any>;
}

export const useThemeCustomizer = () => {
  const [themes, setThemes] = useState<ThemeConfig[]>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeConfig | null>(null);
  const [previewTheme, setPreviewTheme] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const defaultTheme: ThemeConfig = {
    id: 'default',
    name: 'Default Theme',
    colors: {
      primary: '262.1 83.3% 57.8%',
      primaryGlow: '262.1 83.3% 67.8%',
      secondary: '210 40% 98%',
      accent: '210 40% 96%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      muted: '210 40% 96%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      destructive: '0 84.2% 60.2%',
      success: '142.1 76.2% 36.3%',
      warning: '47.9 95.8% 53.1%',
      info: '198.6 88.7% 48.4%'
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
      headingFont: 'Inter, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    layout: {
      borderRadius: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem'
      },
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }
    },
    components: {
      button: {
        defaultStyle: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        variants: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground',
          link: 'underline-offset-4 hover:underline text-primary'
        }
      },
      card: {
        defaultStyle: 'rounded-lg border bg-card text-card-foreground shadow-sm',
        variants: {
          default: '',
          elevated: 'shadow-lg',
          flat: 'shadow-none border-2'
        }
      },
      input: {
        defaultStyle: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variants: {
          default: '',
          filled: 'bg-muted border-transparent',
          underlined: 'border-transparent border-b-2 rounded-none px-0'
        }
      }
    },
    animations: {
      duration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    isActive: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const darkTheme: ThemeConfig = {
    ...defaultTheme,
    id: 'dark',
    name: 'Dark Theme',
    colors: {
      primary: '262.1 83.3% 57.8%',
      primaryGlow: '262.1 83.3% 67.8%',
      secondary: '217.2 32.6% 17.5%',
      accent: '217.2 32.6% 17.5%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      destructive: '0 62.8% 30.6%',
      success: '142.1 70.6% 45.3%',
      warning: '47.9 95.8% 53.1%',
      info: '198.6 88.7% 48.4%'
    },
    isActive: false
  };

  const initializeThemes = () => {
    const savedThemes = localStorage.getItem('custom_themes');
    const savedActiveTheme = localStorage.getItem('active_theme');
    
    if (savedThemes) {
      const parsedThemes = JSON.parse(savedThemes);
      setThemes([defaultTheme, darkTheme, ...parsedThemes]);
    } else {
      setThemes([defaultTheme, darkTheme]);
    }

    if (savedActiveTheme) {
      const activeThemeConfig = JSON.parse(savedActiveTheme);
      setActiveTheme(activeThemeConfig);
      applyTheme(activeThemeConfig);
    } else {
      setActiveTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
    
    setLoading(false);
  };

  const applyTheme = (theme: ThemeConfig) => {
    const root = document.documentElement;
    
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });

    // Apply typography variables
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--heading-font', theme.typography.headingFont);

    // Apply layout variables
    Object.entries(theme.layout.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    Object.entries(theme.layout.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply animation variables
    Object.entries(theme.animations.duration).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value);
    });

    Object.entries(theme.animations.easing).forEach(([key, value]) => {
      root.style.setProperty(`--easing-${key}`, value);
    });
  };

  const createTheme = (themeData: Omit<ThemeConfig, 'id' | 'created_at' | 'updated_at' | 'isActive'>) => {
    try {
      const newTheme: ThemeConfig = {
        ...themeData,
        id: Math.random().toString(36).substring(2, 15),
        isActive: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedThemes = [...themes, newTheme];
      setThemes(updatedThemes);
      
      // Save custom themes (excluding default themes)
      const customThemes = updatedThemes.filter(t => !['default', 'dark'].includes(t.id));
      localStorage.setItem('custom_themes', JSON.stringify(customThemes));

      toast({
        title: "Theme created",
        description: `"${themeData.name}" has been created successfully.`,
      });

      return { success: true, data: newTheme };
    } catch (error: any) {
      toast({
        title: "Failed to create theme",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const updateTheme = (id: string, updates: Partial<ThemeConfig>) => {
    try {
      const updatedThemes = themes.map(theme => 
        theme.id === id 
          ? { ...theme, ...updates, updated_at: new Date().toISOString() }
          : theme
      );
      
      setThemes(updatedThemes);
      
      // Update active theme if it's the one being updated
      if (activeTheme?.id === id) {
        const updatedActiveTheme = updatedThemes.find(t => t.id === id);
        if (updatedActiveTheme) {
          setActiveTheme(updatedActiveTheme);
          applyTheme(updatedActiveTheme);
          localStorage.setItem('active_theme', JSON.stringify(updatedActiveTheme));
        }
      }

      // Save custom themes
      const customThemes = updatedThemes.filter(t => !['default', 'dark'].includes(t.id));
      localStorage.setItem('custom_themes', JSON.stringify(customThemes));

      toast({
        title: "Theme updated",
        description: "Theme has been updated successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to update theme",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const deleteTheme = (id: string) => {
    try {
      if (['default', 'dark'].includes(id)) {
        throw new Error('Cannot delete built-in themes');
      }

      if (activeTheme?.id === id) {
        activateTheme('default');
      }

      const updatedThemes = themes.filter(theme => theme.id !== id);
      setThemes(updatedThemes);
      
      const customThemes = updatedThemes.filter(t => !['default', 'dark'].includes(t.id));
      localStorage.setItem('custom_themes', JSON.stringify(customThemes));

      toast({
        title: "Theme deleted",
        description: "Theme has been deleted successfully.",
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to delete theme",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const activateTheme = (id: string) => {
    try {
      const theme = themes.find(t => t.id === id);
      if (!theme) throw new Error('Theme not found');

      const updatedThemes = themes.map(t => ({ ...t, isActive: t.id === id }));
      setThemes(updatedThemes);
      setActiveTheme(theme);
      applyTheme(theme);
      
      localStorage.setItem('active_theme', JSON.stringify(theme));

      toast({
        title: "Theme activated",
        description: `"${theme.name}" is now active.`,
      });

      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to activate theme",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const previewThemeChange = (theme: ThemeConfig) => {
    setPreviewTheme(theme);
    applyTheme(theme);
  };

  const cancelPreview = () => {
    if (activeTheme) {
      applyTheme(activeTheme);
    }
    setPreviewTheme(null);
  };

  const confirmPreview = () => {
    if (previewTheme) {
      activateTheme(previewTheme.id);
      setPreviewTheme(null);
    }
  };

  const exportTheme = (id: string) => {
    const theme = themes.find(t => t.id === id);
    if (theme) {
      const exportData = JSON.stringify(theme, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const importTheme = (themeData: string) => {
    try {
      const theme = JSON.parse(themeData) as ThemeConfig;
      
      // Validate theme structure
      if (!theme.name || !theme.colors || !theme.typography) {
        throw new Error('Invalid theme format');
      }

      const importedTheme: ThemeConfig = {
        ...theme,
        id: Math.random().toString(36).substring(2, 15),
        isActive: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      createTheme(importedTheme);
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Failed to import theme",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    initializeThemes();
  }, []);

  return {
    themes,
    activeTheme,
    previewTheme,
    loading,
    createTheme,
    updateTheme,
    deleteTheme,
    activateTheme,
    previewThemeChange,
    cancelPreview,
    confirmPreview,
    exportTheme,
    importTheme,
    defaultTheme
  };
};