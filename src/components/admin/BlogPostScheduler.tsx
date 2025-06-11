
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, Pause, Edit } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogPostSchedulerProps {
  posts: BlogPost[];
  onEditPost: (post: BlogPost) => void;
}

const BlogPostScheduler: React.FC<BlogPostSchedulerProps> = ({ posts, onEditPost }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduledPosts = posts.filter(post => 
    post.status === 'draft' && post.published_at
  );

  const draftPosts = posts.filter(post => 
    post.status === 'draft' && !post.published_at
  );

  const publishedToday = posts.filter(post => {
    if (!post.published_at) return false;
    const publishDate = new Date(post.published_at).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return publishDate === today && post.status === 'published';
  });

  const getPostsForDate = (date: string) => {
    return posts.filter(post => {
      if (!post.published_at) return false;
      const postDate = new Date(post.published_at).toISOString().split('T')[0];
      return postDate === date;
    });
  };

  const postsForSelectedDate = getPostsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{scheduledPosts.length}</p>
                <p className="text-gray-400 text-sm">Scheduled Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{draftPosts.length}</p>
                <p className="text-gray-400 text-sm">Draft Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{publishedToday.length}</p>
                <p className="text-gray-400 text-sm">Published Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Publishing Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
              
              <div className="space-y-3">
                <h4 className="text-white font-medium">
                  Posts for {new Date(selectedDate).toLocaleDateString()}:
                </h4>
                
                {postsForSelectedDate.length > 0 ? (
                  <div className="space-y-2">
                    {postsForSelectedDate.map(post => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded">
                        <div>
                          <p className="text-white font-medium truncate">{post.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant={post.status === 'published' ? 'default' : 'secondary'}
                              className={post.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'}
                            >
                              {post.status}
                            </Badge>
                            {post.published_at && (
                              <span className="text-gray-400 text-xs">
                                {new Date(post.published_at).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditPost(post)}
                          className="border-gray-700 text-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">No posts scheduled for this date</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Scheduled Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledPosts.length > 0 ? (
              <div className="space-y-3">
                {scheduledPosts
                  .sort((a, b) => new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime())
                  .slice(0, 10)
                  .map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded">
                      <div className="flex-1">
                        <p className="text-white font-medium truncate">{post.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">
                            {new Date(post.published_at!).toLocaleDateString()} at{' '}
                            {new Date(post.published_at!).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEditPost(post)}
                          className="border-gray-700 text-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No scheduled posts</p>
                <p className="text-gray-500 text-sm">Create posts and schedule them for future publication</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPostScheduler;
