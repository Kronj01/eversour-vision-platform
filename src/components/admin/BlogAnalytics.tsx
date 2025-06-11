
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, MessageCircle, Share, TrendingUp, Users } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface BlogAnalyticsProps {
  posts: BlogPost[];
}

const BlogAnalytics: React.FC<BlogAnalyticsProps> = ({ posts }) => {
  const totalViews = posts.reduce((sum, post) => sum + (post.view_count || 0), 0);
  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const averageReadingTime = posts.length > 0 
    ? Math.round(posts.reduce((sum, post) => sum + (post.reading_time || 0), 0) / posts.length)
    : 0;

  const topPosts = posts
    .filter(post => post.view_count && post.view_count > 0)
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);

  const recentPosts = posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: 'Total Views',
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    {
      title: 'Published Posts',
      value: publishedPosts.length.toString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-green-500/20'
    },
    {
      title: 'Draft Posts',
      value: draftPosts.length.toString(),
      icon: MessageCircle,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20'
    },
    {
      title: 'Avg Read Time',
      value: `${averageReadingTime} min`,
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Posts */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Top Performing Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPosts.length > 0 ? (
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium truncate">{post.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {post.status}
                        </Badge>
                        <span className="text-gray-400 text-xs">
                          {post.reading_time} min read
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">{post.view_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No view data available yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Publications */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-purple-400" />
              Recent Publications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-3 bg-gray-800/30 rounded-lg">
                    <p className="text-white font-medium truncate mb-2">{post.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {post.categories?.slice(0, 2).map(category => (
                          <span
                            key={category.id}
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                        ))}
                        <span className="text-gray-400 text-xs">
                          {new Date(post.published_at || post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{post.view_count || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No published posts yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogAnalytics;
