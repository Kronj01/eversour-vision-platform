import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRealtimeAnalytics } from "@/hooks/useRealtimeAnalytics";
import { Users, Activity, Clock, TrendingUp, Globe2, Monitor, Smartphone, Tablet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export const RealTimeAnalyticsDashboard = () => {
  const { metrics, activeSessions, loading } = useRealtimeAnalytics(5000);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const deviceData = [
    { name: 'Desktop', value: metrics.deviceBreakdown.desktop, icon: Monitor },
    { name: 'Mobile', value: metrics.deviceBreakdown.mobile, icon: Smartphone },
    { name: 'Tablet', value: metrics.deviceBreakdown.tablet, icon: Tablet },
  ];

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="mt-1">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views/Min</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pageViewsPerMinute}</div>
            <p className="text-xs text-muted-foreground">Last hour average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor(metrics.avgSessionDuration / 60)}:{(metrics.avgSessionDuration % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-xs text-muted-foreground">Minutes:Seconds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.bounceRate}%</div>
            <Progress value={100 - metrics.bounceRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages (Live)</CardTitle>
            <CardDescription>Most viewed pages in the last hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.topPages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="url" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Current active sessions by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={device.name} className="flex items-center">
                  <device.icon className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.value}</p>
                    </div>
                    <Progress value={(device.value / metrics.activeUsers) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top 10 countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <Badge variant="secondary">{country.visitors}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={metrics.trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.source}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {metrics.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Users currently browsing your site (last 5 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th className="px-4 py-3">Session ID</th>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Pages</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.slice(0, 10).map((session) => (
                  <tr key={session.id} className="border-b">
                    <td className="px-4 py-3 font-mono text-xs">{session.session_id.slice(0, 8)}...</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{session.device_type || 'Unknown'}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {session.city && session.country ? `${session.city}, ${session.country}` : session.country || 'Unknown'}
                    </td>
                    <td className="px-4 py-3">{session.total_page_views || 0}</td>
                    <td className="px-4 py-3">
                      {Math.floor((session.total_time_spent || 0) / 60)}m {(session.total_time_spent || 0) % 60}s
                    </td>
                    <td className="px-4 py-3">
                      {new Date(session.last_activity).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
