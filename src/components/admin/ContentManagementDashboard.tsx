
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Image, 
  Save, 
  Eye, 
  Upload, 
  Search, 
  Edit,
  Plus,
  FileText,
  Settings
} from 'lucide-react';
import { useContentManagement, PageContent } from '@/hooks/useContentManagement';

const ContentManagementDashboard = () => {
  const { pages, mediaAssets, loading, updatePageContent, uploadMedia } = useContentManagement();
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [editingContent, setEditingContent] = useState<Partial<PageContent>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = pages.filter(page =>
    page.page_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.page_path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveContent = async () => {
    if (selectedPage && editingContent) {
      await updatePageContent(selectedPage.id, editingContent);
      setSelectedPage(null);
      setEditingContent({});
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadMedia(file);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading content management...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Content Management System
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage page content, metadata, images, and SEO settings
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Media
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,video/*"
                />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="pages" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="pages" className="text-white data-[state=active]:bg-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                Pages
              </TabsTrigger>
              <TabsTrigger value="media" className="text-white data-[state=active]:bg-purple-600">
                <Image className="w-4 h-4 mr-2" />
                Media Library
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-white data-[state=active]:bg-purple-600">
                <Search className="w-4 h-4 mr-2" />
                SEO Settings
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-white data-[state=active]:bg-purple-600">
                <Settings className="w-4 h-4 mr-2" />
                Templates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>

              {/* Pages List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Pages</h3>
                  {filteredPages.map((page) => (
                    <div
                      key={page.id}
                      className={`glass-card cursor-pointer transition-all ${
                        selectedPage?.id === page.id ? 'ring-2 ring-purple-500' : ''
                      }`}
                      onClick={() => {
                        setSelectedPage(page);
                        setEditingContent(page);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{page.page_title}</h4>
                        <div className="flex items-center space-x-2">
                          {page.published ? (
                            <Badge className="bg-green-500/20 text-green-400">Published</Badge>
                          ) : (
                            <Badge className="bg-gray-500/20 text-gray-400">Draft</Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{page.page_path}</p>
                      <p className="text-gray-500 text-xs mt-2">
                        Last updated: {new Date(page.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Page Editor */}
                {selectedPage && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Edit Page</h3>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSaveContent} className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    <div className="glass-card space-y-4">
                      <div>
                        <Label className="text-white">Page Title</Label>
                        <Input
                          value={editingContent.page_title || ''}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, page_title: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Page Path</Label>
                        <Input
                          value={editingContent.page_path || ''}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, page_path: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Meta Description</Label>
                        <Textarea
                          value={editingContent.meta_description || ''}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, meta_description: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-white">Meta Keywords</Label>
                        <Input
                          value={editingContent.meta_keywords?.join(', ') || ''}
                          onChange={(e) => setEditingContent(prev => ({ 
                            ...prev, 
                            meta_keywords: e.target.value.split(',').map(k => k.trim()) 
                          }))}
                          placeholder="keyword1, keyword2, keyword3"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">OG Title</Label>
                          <Input
                            value={editingContent.og_title || ''}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, og_title: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">OG Image URL</Label>
                          <Input
                            value={editingContent.og_image || ''}
                            onChange={(e) => setEditingContent(prev => ({ ...prev, og_image: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">OG Description</Label>
                        <Textarea
                          value={editingContent.og_description || ''}
                          onChange={(e) => setEditingContent(prev => ({ ...prev, og_description: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={2}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingContent.published || false}
                          onCheckedChange={(checked) => setEditingContent(prev => ({ ...prev, published: checked }))}
                        />
                        <Label className="text-white">Published</Label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Media Library</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {mediaAssets.map((asset) => (
                  <div key={asset.id} className="glass-card">
                    {asset.type === 'image' ? (
                      <img
                        src={asset.url}
                        alt={asset.alt_text || asset.filename}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <p className="text-white text-xs font-medium truncate">{asset.filename}</p>
                    <p className="text-gray-400 text-xs">{(asset.size / 1024).toFixed(1)} KB</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <div className="glass-card">
                <h3 className="text-lg font-semibold text-white mb-4">Global SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">Site Title</Label>
                    <Input
                      defaultValue="Eversour - Next-Generation Digital Solutions"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Site Description</Label>
                    <Textarea
                      defaultValue="Transform your business with cutting-edge digital solutions"
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className="text-white">Default Keywords</Label>
                    <Input
                      defaultValue="digital solutions, web development, software development"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Landing Page', 'Blog Post', 'Service Page', 'Contact Page'].map((template) => (
                  <div key={template} className="glass-card">
                    <h4 className="text-white font-medium mb-2">{template}</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Pre-built template for {template.toLowerCase()}
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementDashboard;
