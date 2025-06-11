
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-600/20 text-green-400';
      case 'draft': return 'bg-yellow-600/20 text-yellow-400';
      case 'archived': return 'bg-gray-600/20 text-gray-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {post.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author?.full_name || post.author?.email || 'Unknown'}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.created_at)}
              </div>
              {post.view_count !== null && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.view_count}
                </div>
              )}
            </div>
          </div>
          <Badge className={getStatusColor(post.status)}>
            {post.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {post.excerpt && (
          <p className="text-gray-300 text-sm line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map(category => (
              <Badge 
                key={category.id} 
                variant="outline" 
                className="border-gray-600 text-gray-300"
                style={{ borderColor: category.color + '40', color: category.color }}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-gray-400">
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="text-xs text-gray-500">
            {post.reading_time && `${post.reading_time} min read`}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onEdit(post)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onDelete(post.id)}
              className="border-red-700 text-red-400 hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;
