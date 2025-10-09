import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBehavioralAnalytics } from "@/hooks/useBehavioralAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MousePointer, Video, Route, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BehavioralAnalyticsDashboard = () => {
  const { heatmapData, recordings, userJourney, loading, fetchHeatmapData, fetchSessionRecordings, fetchUserJourney } = useBehavioralAnalytics();
  const [selectedPage, setSelectedPage] = useState('');
  const [deviceType, setDeviceType] = useState('desktop');
  const [selectedSession, setSelectedSession] = useState('');

  const handleLoadHeatmap = () => {
    if (selectedPage) {
      fetchHeatmapData(selectedPage, deviceType);
    }
  };

  const handleLoadRecordings = () => {
    fetchSessionRecordings(50);
  };

  const handleLoadJourney = () => {
    if (selectedSession) {
      fetchUserJourney(selectedSession);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="heatmaps">
        <TabsList>
          <TabsTrigger value="heatmaps">
            <MousePointer className="h-4 w-4 mr-2" />
            Heatmaps
          </TabsTrigger>
          <TabsTrigger value="recordings">
            <Video className="h-4 w-4 mr-2" />
            Session Recordings
          </TabsTrigger>
          <TabsTrigger value="journeys">
            <Route className="h-4 w-4 mr-2" />
            User Journeys
          </TabsTrigger>
        </TabsList>

        {/* Heatmaps Tab */}
        <TabsContent value="heatmaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Heatmap Analysis</CardTitle>
              <CardDescription>Visualize where users click, move, and scroll on your pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter page URL (e.g., /about)"
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                  />
                </div>
                <Select value={deviceType} onValueChange={setDeviceType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleLoadHeatmap} disabled={!selectedPage}>
                  <Search className="h-4 w-4 mr-2" />
                  Load Heatmap
                </Button>
              </div>

              {heatmapData && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Clicks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{heatmapData.clicks.length}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Avg Scroll Depth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {heatmapData.scrollDepth.length > 0
                            ? Math.round(heatmapData.scrollDepth.reduce((a, b) => a + b, 0) / heatmapData.scrollDepth.length)
                            : 0}%
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Page URL</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm font-mono truncate">{heatmapData.page_url}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Click Heatmap Visualization */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Click Heatmap</CardTitle>
                      <CardDescription>Hot spots show where users clicked most</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-muted rounded-lg p-8 min-h-[400px]">
                        <p className="text-center text-muted-foreground">
                          Heatmap visualization would be rendered here
                        </p>
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {heatmapData.clicks.slice(0, 8).map((click, i) => (
                            <div key={i} className="bg-background p-2 rounded text-xs">
                              <div>Position: ({click.x}, {click.y})</div>
                              <div>Clicks: {click.count}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scroll Depth */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Scroll Depth Distribution</CardTitle>
                      <CardDescription>How far users scroll down the page</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[0, 25, 50, 75, 100].map((depth) => {
                          const count = heatmapData.scrollDepth.filter(d => d >= depth && d < depth + 25).length;
                          const percentage = heatmapData.scrollDepth.length > 0
                            ? (count / heatmapData.scrollDepth.length) * 100
                            : 0;
                          return (
                            <div key={depth} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{depth}% - {depth + 25}%</span>
                                <span>{count} users</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Recordings Tab */}
        <TabsContent value="recordings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Recordings</CardTitle>
              <CardDescription>Replay user sessions to understand behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleLoadRecordings} disabled={loading}>
                <Video className="h-4 w-4 mr-2" />
                Load Recent Recordings
              </Button>

              <div className="grid gap-4">
                {recordings.map((recording) => (
                  <Card key={recording.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm font-mono">{recording.session_id.slice(0, 12)}...</CardTitle>
                          <CardDescription className="mt-1">
                            {new Date(recording.started_at).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge>{recording.duration}s</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex gap-4">
                          <span>Pages: <strong>{recording.page_count}</strong></span>
                          <span>Events: <strong>{recording.event_count}</strong></span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Journeys Tab */}
        <TabsContent value="journeys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Analysis</CardTitle>
              <CardDescription>Track the path users take through your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter session ID"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleLoadJourney} disabled={!selectedSession}>
                  <Search className="h-4 w-4 mr-2" />
                  Load Journey
                </Button>
              </div>

              {userJourney && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Page Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userJourney.pages.map((page, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <Badge variant="outline">{index + 1}</Badge>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{page.url}</div>
                              <div className="text-xs text-muted-foreground">
                                {Math.floor(page.duration / 1000)}s • {new Date(page.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userJourney.events.slice(0, 10).map((event, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{event.type}</Badge>
                              <span className="text-muted-foreground">{event.page_url}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
