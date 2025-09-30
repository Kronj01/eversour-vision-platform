import { useState, useEffect } from 'react';
import { X, Save, Eye, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RichTextEditor from './RichTextEditor';
import { usePageManagement, type Page } from '@/hooks/usePageManagement';
import { useToast } from '@/hooks/use-toast';

interface PageEditorProps {
  pageId: string | null;
  onClose: () => void;
}

export function PageEditor({ pageId, onClose }: PageEditorProps) {
  const { pages, createPage, updatePage } = usePageManagement();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const existingPage = pageId ? pages.find(p => p.id === pageId) : null;
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    featured_image: '',
    template: 'default',
    status: 'draft' as 'draft' | 'published' | 'archived',
    visibility: 'public' as 'public' | 'private' | 'password',
    password: '',
    custom_fields: {} as Record<string, any>,
    seo_settings: {} as Record<string, any>
  });

  useEffect(() => {
    if (existingPage) {
      setFormData({
        title: existingPage.title,
        slug: existingPage.slug,
        content: existingPage.content,
        meta_title: existingPage.meta_title || '',
        meta_description: existingPage.meta_description || '',
        featured_image: existingPage.featured_image || '',
        template: existingPage.template,
        status: existingPage.status,
        visibility: existingPage.visibility,
        password: existingPage.password || '',
        custom_fields: existingPage.custom_fields,
        seo_settings: existingPage.seo_settings
      });
    }
  }, [existingPage]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !existingPage ? generateSlug(title) : prev.slug
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and slug are required.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const pageData = {
        ...formData,
        sort_order: 0,
        author_id: existingPage?.author_id || ''
      };

      if (pageId) {
        await updatePage(pageId, pageData);
      } else {
        await createPage(pageData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle>
              {pageId ? 'Edit Page' : 'Create New Page'}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={saving} size="sm">
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="flex-shrink-0">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-auto p-4">
              <TabsContent value="content" className="space-y-4 m-0">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter page title..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="page-url-slug"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                      placeholder="Start writing your page content..."
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Page Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="template">Template</Label>
                        <Select 
                          value={formData.template} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, template: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="landing">Landing Page</SelectItem>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="service">Service Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="visibility">Visibility</Label>
                        <Select 
                          value={formData.visibility} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="password">Password Protected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.visibility === 'password' && (
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter password..."
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="featured_image">Image URL</Label>
                        <Input
                          id="featured_image"
                          value={formData.featured_image}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4 m-0">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                        placeholder="SEO title for search engines..."
                        maxLength={60}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.meta_title.length}/60 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                        placeholder="Brief description for search results..."
                        maxLength={160}
                        rows={3}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.meta_description.length}/160 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}