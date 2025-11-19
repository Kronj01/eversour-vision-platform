import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Calendar, Clock, Video, Phone, MapPin, Edit, Trash2 } from "lucide-react";
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

interface Interview {
  id: string;
  application_id: string;
  interview_type: string;
  scheduled_at: string;
  duration_minutes: number;
  location: string;
  interviewer_name: string;
  interviewer_email: string;
  status: string;
  notes: string;
  feedback: string;
  job_applications: {
    applicant_name: string;
    applicant_email: string;
    job_postings: {
      title: string;
    };
  };
}

export default function InterviewScheduling() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    application_id: "",
    interview_type: "phone",
    scheduled_at: "",
    duration_minutes: 60,
    location: "",
    interviewer_name: "",
    interviewer_email: "",
    status: "scheduled",
    notes: "",
  });

  useEffect(() => {
    fetchInterviews();
    fetchApplications();
  }, []);

  const fetchInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from("interview_schedules")
        .select(`
          *,
          job_applications (
            applicant_name,
            applicant_email,
            job_postings (
              title
            )
          )
        `)
        .order("scheduled_at", { ascending: true });

      if (error) throw error;
      setInterviews(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select(`
          id,
          applicant_name,
          job_postings (
            title
          )
        `)
        .in("status", ["screening", "interview"]);

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingInterview) {
        const { error } = await supabase
          .from("interview_schedules")
          .update(formData)
          .eq("id", editingInterview.id);

        if (error) throw error;
        toast({ title: "Interview updated successfully" });
      } else {
        const { error } = await supabase
          .from("interview_schedules")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Interview scheduled successfully" });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchInterviews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this interview?")) return;

    try {
      const { error } = await supabase
        .from("interview_schedules")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Interview deleted successfully" });
      fetchInterviews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    setFormData({
      application_id: interview.application_id,
      interview_type: interview.interview_type,
      scheduled_at: interview.scheduled_at,
      duration_minutes: interview.duration_minutes,
      location: interview.location || "",
      interviewer_name: interview.interviewer_name || "",
      interviewer_email: interview.interviewer_email || "",
      status: interview.status,
      notes: interview.notes || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingInterview(null);
    setFormData({
      application_id: "",
      interview_type: "phone",
      scheduled_at: "",
      duration_minutes: 60,
      location: "",
      interviewer_name: "",
      interviewer_email: "",
      status: "scheduled",
      notes: "",
    });
  };

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "phone":
        return <Phone className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "rescheduled":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const groupInterviewsByDate = () => {
    const groups: { [key: string]: Interview[] } = {};
    interviews.forEach((interview) => {
      const date = new Date(interview.scheduled_at).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(interview);
    });
    return groups;
  };

  const groupedInterviews = groupInterviewsByDate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Interview Scheduling</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedInterviews).map(([date, dateInterviews]) => (
          <div key={date}>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {date}
            </h3>
            <div className="grid gap-4">
              {dateInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {interview.job_applications?.applicant_name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {interview.job_applications?.job_postings?.title}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getInterviewTypeIcon(interview.interview_type)}
                            {interview.interview_type}
                          </Badge>
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(interview)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(interview.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(interview.scheduled_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{interview.duration_minutes} min</span>
                      </div>
                      {interview.interviewer_name && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Interviewer:</span>
                          <span>{interview.interviewer_name}</span>
                        </div>
                      )}
                      {interview.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="truncate">{interview.location}</span>
                        </div>
                      )}
                    </div>
                    {interview.notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {interview.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingInterview ? "Edit Interview" : "Schedule Interview"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Candidate</label>
              <Select
                required
                value={formData.application_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, application_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select candidate" />
                </SelectTrigger>
                <SelectContent>
                  {applications.map((app) => (
                    <SelectItem key={app.id} value={app.id}>
                      {app.applicant_name} - {app.job_postings?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Interview Type</label>
                <Select
                  value={formData.interview_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, interview_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="in-person">In-person</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date & Time</label>
                <Input
                  required
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduled_at: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input
                  required
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_minutes: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Location / Meeting Link</label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Physical address or video meeting link"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Interviewer Name</label>
                <Input
                  value={formData.interviewer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, interviewer_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Interviewer Email</label>
                <Input
                  type="email"
                  value={formData.interviewer_email}
                  onChange={(e) =>
                    setFormData({ ...formData, interviewer_email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Additional notes about the interview"
              />
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
              <Button type="submit">
                {editingInterview ? "Update" : "Schedule"} Interview
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
