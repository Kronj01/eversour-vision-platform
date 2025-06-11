
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Calendar, Clock } from 'lucide-react';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import RichTextEditor from './RichTextEditor';

interface BlogPostFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  initialData?: any;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isSubmitting,
  initialData 
}) => {
  const { categories } = useBlogCategories();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featured_image: initialData?.featured_image || '',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    status: initialData?.status || 'draft',
    tags: initialData?.tags || [],
    category_ids: initialData?.categories?.map((cat: any) => cat.id) || [],
    published_at: initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : ''
  });
  const [newTag, setNewTag] = useState('');
  const [showScheduling, setShowScheduling] = useState(!!initialData?.published_at);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = { ...formData };
    
    // Handle scheduling
    if (formData.status === 'published' && showScheduling && formData.published_at) {
      submitData.published_at = new Date(formData.published_at).toISOString();
    } else if (formData.status === 'published' && !showScheduling) {
      submitData.published_at = new Date().toISOString();
    } else {
      submitData.published_at = null;
    }
    
    onSubmit(submitData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      category_ids: prev.category_ids.includes(categoryId)
        ? prev.category_ids.filter(id => id !== categoryId)
        : [...prev.category_ids, categoryId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter post title..."
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post..."
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Write your post content here..."
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Title
                </label>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO title for search engines..."
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description
                </label>
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO description for search engines..."
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, status: value }));
                    if (value !== 'published') {
                      setShowScheduling(false);
                    }
                  }}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === 'published' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="schedule"
                      checked={showScheduling}
                      onChange={(e) => setShowScheduling(e.target.checked)}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                    <label htmlFor="schedule" className="text-sm text-gray-300 cursor-pointer">
                      Schedule for later
                    </label>
                  </div>

                  {showScheduling && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Publish Date & Time
                      </label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input
                          type="datetime-local"
                          value={formData.published_at}
                          onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={formData.category_ids.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-600 bg-gray-800"
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm text-gray-300 cursor-pointer flex items-center"
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="bg-gray-800 border-gray-700 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default BlogPostForm;
