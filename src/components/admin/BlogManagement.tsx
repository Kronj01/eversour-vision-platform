
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Edit, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogManagement = () => {
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
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Blog Management Coming Soon</h3>
            <p className="text-gray-400 mb-6">
              Blog management system is pending implementation. Once ready, you'll be able to:
            </p>
            <div className="text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center text-gray-300">
                <Plus className="w-4 h-4 mr-3 text-purple-400" />
                Create new blog posts
              </div>
              <div className="flex items-center text-gray-300">
                <Edit className="w-4 h-4 mr-3 text-purple-400" />
                Edit existing content
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-purple-400" />
                Schedule publications
              </div>
              <div className="flex items-center text-gray-300">
                <Eye className="w-4 h-4 mr-3 text-purple-400" />
                Preview before publishing
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
