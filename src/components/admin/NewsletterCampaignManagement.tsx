import { useState, useEffect } from "react";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useSegmentation } from "@/hooks/useSegmentation";
import { useEmailMarketing } from "@/hooks/useEmailMarketing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Send, Users, Mail, TrendingUp, Eye, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface CampaignStats {
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
}

export default function NewsletterCampaignManagement() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { segments, fetchSegments } = useSegmentation();
  const { templates, fetchTemplates } = useEmailMarketing();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    template_id: "",
    segment_id: "",
    scheduled_at: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([
        fetchCampaigns(),
        fetchSegments(),
        fetchTemplates(),
        fetchAnalytics(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from("email_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    setCampaigns(data || []);
  };

  const fetchAnalytics = async () => {
    const { data, error } = await supabase
      .from("campaign_analytics")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    setAnalytics(data || []);
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get subscribers from selected segment
      const { data: segmentMembers } = await supabase
        .from("segment_members")
        .select("email")
        .eq("segment_id", formData.segment_id);

      const recipientList = segmentMembers?.map((m) => m.email) || [];

      const { error } = await supabase.from("email_campaigns").insert([
        {
          name: formData.name,
          subject: formData.subject,
          content: formData.content,
          template_id: formData.template_id || null,
          recipient_list: recipientList,
          scheduled_at: formData.scheduled_at || null,
          status: formData.scheduled_at ? "scheduled" : "draft",
        },
      ]);

      if (error) throw error;

      toast({ title: "Campaign created successfully" });
      setIsDialogOpen(false);
      resetForm();
      fetchCampaigns();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      subject: "",
      content: "",
      template_id: "",
      segment_id: "",
      scheduled_at: "",
    });
  };

  const getCampaignStats = (campaignId: string): CampaignStats => {
    const campaignAnalytics = analytics.filter(
      (a) => a.campaign_id === campaignId && a.campaign_type === "email"
    );

    return {
      sent: campaignAnalytics.filter((a) => a.event_type === "sent").length,
      opened: campaignAnalytics.filter((a) => a.event_type === "opened").length,
      clicked: campaignAnalytics.filter((a) => a.event_type === "clicked").length,
      bounced: campaignAnalytics.filter((a) => a.event_type === "bounced").length,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "draft":
        return "bg-gray-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Newsletter Campaign Management</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => {
            const stats = getCampaignStats(campaign.id);
            const openRate =
              stats.sent > 0 ? ((stats.opened / stats.sent) * 100).toFixed(1) : "0";
            const clickRate =
              stats.sent > 0 ? ((stats.clicked / stats.sent) * 100).toFixed(1) : "0";

            return (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{campaign.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {campaign.subject}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                        {campaign.scheduled_at && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(campaign.scheduled_at).toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {campaign.status === "draft" && (
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send Now
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{stats.sent}</div>
                        <div className="text-muted-foreground">Sent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">
                          {stats.opened} ({openRate}%)
                        </div>
                        <div className="text-muted-foreground">Opened</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">
                          {stats.clicked} ({clickRate}%)
                        </div>
                        <div className="text-muted-foreground">Clicked</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">
                          {Array.isArray(campaign.recipient_list)
                            ? campaign.recipient_list.length
                            : 0}
                        </div>
                        <div className="text-muted-foreground">Recipients</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardHeader>
                <CardTitle>{segment.name}</CardTitle>
                {segment.description && (
                  <p className="text-sm text-muted-foreground">{segment.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{segment.member_count || 0}</span>
                  <span className="text-muted-foreground">subscribers</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.subject}</p>
                  {template.category && (
                    <Badge variant="outline" className="w-fit mt-2">
                      {template.category}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{campaigns.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analytics.filter((a) => a.event_type === "sent").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Avg Open Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(() => {
                    const sent = analytics.filter((a) => a.event_type === "sent").length;
                    const opened = analytics.filter((a) => a.event_type === "opened")
                      .length;
                    return sent > 0 ? ((opened / sent) * 100).toFixed(1) : "0";
                  })()}
                  %
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Avg Click Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(() => {
                    const sent = analytics.filter((a) => a.event_type === "sent").length;
                    const clicked = analytics.filter(
                      (a) => a.event_type === "clicked"
                    ).length;
                    return sent > 0 ? ((clicked / sent) * 100).toFixed(1) : "0";
                  })()}
                  %
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Email Campaign</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Name</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Monthly Newsletter - January 2024"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Subject</label>
              <Input
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject line for the email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Select Segment</label>
              <Select
                required
                value={formData.segment_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, segment_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose subscriber segment" />
                </SelectTrigger>
                <SelectContent>
                  {segments.map((segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name} ({segment.member_count || 0} subscribers)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Email Template (Optional)</label>
              <Select
                value={formData.template_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, template_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Email Content</label>
              <Textarea
                required
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your email content here..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Schedule Send (Optional)
              </label>
              <Input
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) =>
                  setFormData({ ...formData, scheduled_at: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to save as draft
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create Campaign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
