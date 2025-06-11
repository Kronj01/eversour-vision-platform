
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Tag, Edit, Trash2, Save, X } from 'lucide-react';
import { useBlogCategories, BlogCategory } from '@/hooks/useBlogCategories';

const CategoryManager = () => {
  const { categories, createCategory } = useBlogCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1'
  });

  const colorOptions = [
    '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', 
    '#f59e0b', '#ef4444', '#ec4899', '#84cc16'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createCategory(formData);
    
    if (result.success) {
      setFormData({ name: '', description: '', color: '#6366f1' });
      setShowForm(false);
      setEditingCategory(null);
    }
  };

  const handleEdit = (category: BlogCategory) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      color: category.color
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', color: '#6366f1' });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Category Management
            </CardTitle>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {showForm && (
            <Card className="mb-6 bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter category name..."
                      className="bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the category..."
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        {colorOptions.map(color => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, color }))}
                            className={`w-8 h-8 rounded-full border-2 ${
                              formData.color === color ? 'border-white' : 'border-gray-600'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <Input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        className="w-16 h-8 bg-gray-700 border-gray-600"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingCategory ? 'Update' : 'Create'} Category
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Categories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <Card key={category.id} className="bg-gray-800/30 border-gray-700 hover:border-purple-400/30 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <h4 className="font-medium text-white">{category.name}</h4>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(category)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {category.description && (
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                  )}
                  
                  <Badge variant="outline" className="text-xs">
                    {category.slug}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No categories yet</h3>
              <p className="text-gray-500 mb-6">Create your first category to organize your blog posts</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Category
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManager;
