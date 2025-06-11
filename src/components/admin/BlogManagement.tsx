
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Search, BarChart3, Tag, Calendar } from 'lucide-react';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { useBlogCategories } from '@/hooks/useBlogCategories';
import BlogPostForm from './BlogPostForm';
import BlogPostCard from './BlogPostCard';
import BlogAnalytics from './BlogAnalytics';
import CategoryManager from './CategoryManager';
import BlogPostScheduler from './BlogPostScheduler';

const BlogManagement = () => {
  const { posts, loading, createPost, updatePost, deletePost } = useBlogPosts();
  const { categories } = useBlogCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || 
                           post.categories?.some(cat => cat.id === categoryFilter);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      let result;
      if (editingPost) {
        result = await updatePost(editingPost.id, data);
      } else {
        result = await createPost(data);
      }
      
      if (result.success) {
        setShowForm(false);
        setEditingPost(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      await deletePost(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <p className="text-gray-400">
              {editingPost ? 'Update your blog post' : 'Write and publish a new blog post'}
            </p>
          </div>
        </div>
        
        <BlogPostForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          initialData={editingPost}
        />
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
                <FileText className="w-5 h-5 mr-2" />
                Blog Management
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create and manage blog posts and content
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
              <TabsTrigger value="posts" className="text-white data-[state=active]:bg-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-purple-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-white data-[state=active]:bg-purple-600">
                <Tag className="w-4 h-4 mr-2" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="scheduler" className="text-white data-[state=active]:bg-purple-600">
                <Calendar className="w-4 h-4 mr-2" />
                Scheduler
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Posts Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading posts...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    {posts.length === 0 ? 'No posts yet' : 'No posts match your filters'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {posts.length === 0 
                      ? 'Get started by creating your first blog post'
                      : 'Try adjusting your search or filter criteria'
                    }
                  </p>
                  {posts.length === 0 && (
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Post
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400">
                      Showing {filteredPosts.length} of {posts.length} posts
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="analytics">
              <BlogAnalytics posts={posts} />
            </TabsContent>

            <TabsContent value="categories">
              <CategoryManager />
            </TabsContent>

            <TabsContent value="scheduler">
              <BlogPostScheduler posts={posts} onEditPost={handleEdit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
