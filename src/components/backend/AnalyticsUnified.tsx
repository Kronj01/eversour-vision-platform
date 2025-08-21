import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSupabaseAnalytics } from '@/hooks/useSupabaseAnalytics';
import { useSupabaseLeads } from '@/hooks/useSupabaseLeads';
import { useSupabaseSEO } from '@/hooks/useSupabaseSEO';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Eye, 
  Users, 
  TrendingUp, 
  Target, 
  Search, 
  Link, 
  Gauge,
  Contact,
  UserCheck,
  AlertCircle,
  ArrowUpRight,
  Calendar
} from 'lucide-react';

interface AnalyticsUnifiedProps {
  timeframe?: string;
}

const AnalyticsUnified: React.FC<AnalyticsUnifiedProps> = ({ timeframe = '30d' }) => {
  const { data: analyticsData, loading: analyticsLoading, error: analyticsError } = useSupabaseAnalytics(timeframe);
  const { leads, loading: leadsLoading, error: leadsError } = useSupabaseLeads();
  const { data: seoData, loading: seoLoading, error: seoError } = useSupabaseSEO();

  const isLoading = analyticsLoading || leadsLoading || seoLoading;
  const hasError = analyticsError || leadsError || seoError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (hasError) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error Loading Analytics
          </CardTitle>
          <CardDescription>
            {analyticsError || leadsError || seoError}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry Loading
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Prepare lead status data for charts
  const leadStatusData = leads?.reduce((acc: any[], lead) => {
    const existingStatus = acc.find(item => item.status === lead.status);
    if (existingStatus) {
      existingStatus.count += 1;
    } else {
      acc.push({ status: lead.status, count: 1 });
    }
    return acc;
  }, []) || [];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive overview of your website performance and leads
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Last {timeframe}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.page_views || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Website traffic
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.unique_visitors || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Individual users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Contact className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Contact submissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.conversion_rate || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  Visitor to lead
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of leads by current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Performance</CardTitle>
                <CardDescription>
                  Current SEO metrics and rankings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Domain Authority</span>
                  <Badge variant="secondary">{seoData?.domain_authority || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Backlinks</span>
                  <Badge variant="secondary">{seoData?.backlinks_count || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Page Speed</span>
                  <Badge variant="secondary">{seoData?.page_speed_score || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Keywords Tracked</span>
                  <Badge variant="secondary">{seoData?.keyword_rankings?.length || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData?.top_pages?.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="text-sm font-medium">{page.url}</span>
                    </div>
                    <Badge variant="secondary">{page.views} views</Badge>
                  </div>
                )) || (
                  <p className="text-muted-foreground">No page data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bounce Rate</CardTitle>
                <CardDescription>
                  Percentage of single-page sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{analyticsData?.bounce_rate || 0}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Session Duration</CardTitle>
                <CardDescription>
                  Time spent on site per session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2m 34s</div>
                <p className="text-xs text-muted-foreground">Average time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads?.filter(lead => lead.status === 'new').length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting contact
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads?.filter(lead => lead.status === 'qualified').length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ready for conversion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads?.filter(lead => lead.status === 'converted').length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successful conversions
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>
                Latest contact submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads?.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        lead.status === 'new' ? 'default' :
                        lead.status === 'qualified' ? 'secondary' :
                        lead.status === 'converted' ? 'default' : 'outline'
                      }>
                        {lead.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Domain Authority</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoData?.domain_authority || 0}</div>
                <p className="text-xs text-muted-foreground">
                  SEO strength score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
                <Link className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoData?.backlinks_count || 0}</div>
                <p className="text-xs text-muted-foreground">
                  External links
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Speed</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoData?.page_speed_score || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Performance score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keywords</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoData?.keyword_rankings?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Tracked keywords
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Current search engine positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoData?.keyword_rankings?.slice(0, 10).map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{keyword.keyword}</p>
                      <p className="text-sm text-muted-foreground">
                        Search Volume: {keyword.search_volume}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={keyword.position <= 10 ? 'default' : 'secondary'}>
                        #{keyword.position}
                      </Badge>
                    </div>
                  </div>
                )) || (
                  <p className="text-muted-foreground">No keyword data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsUnified;