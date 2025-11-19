import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Mail, Phone, FileText, Star, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Application {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter: string;
  portfolio_url: string;
  linkedin_url: string;
  years_of_experience: number;
  current_company: string;
  expected_salary: string;
  availability_date: string;
  status: string;
  rating: number;
  notes: string;
  applied_at: string;
  job_postings: {
    title: string;
    department: string;
  };
}

export default function ApplicationTracking() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    try {
      let query = supabase
        .from("job_applications")
        .select(`
          *,
          job_postings (
            title,
            department
          )
        `)
        .order("applied_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplications(data || []);
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

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Application status updated" });
      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateRating = async (id: string, rating: number) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ rating })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Rating updated" });
      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({ notes })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Notes updated" });
      fetchApplications();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter((app) =>
    app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicant_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job_postings?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "screening":
        return "bg-yellow-500";
      case "interview":
        return "bg-purple-500";
      case "offer":
        return "bg-green-500";
      case "hired":
        return "bg-emerald-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const statusOptions = [
    { value: "new", label: "New" },
    { value: "screening", label: "Screening" },
    { value: "interview", label: "Interview" },
    { value: "offer", label: "Offer" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Application Tracking</h2>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredApplications.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl">{app.applicant_name}</CardTitle>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="outline">{app.job_postings?.title}</Badge>
                    <Badge variant="outline">{app.job_postings?.department}</Badge>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    {app.years_of_experience && (
                      <Badge variant="secondary">
                        {app.years_of_experience} years exp
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 cursor-pointer ${
                        app.rating >= star
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => updateRating(app.id, star)}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${app.applicant_email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {app.applicant_email}
                  </a>
                </div>
                {app.applicant_phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{app.applicant_phone}</span>
                  </div>
                )}
                {app.current_company && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span className="font-medium">{app.current_company}</span>
                  </div>
                )}
                {app.expected_salary && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Expected:</span>
                    <span className="font-medium">{app.expected_salary}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsDetailsOpen(true);
                  }}
                >
                  View Details
                </Button>
                <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                </a>
                {app.portfolio_url && (
                  <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Portfolio
                    </Button>
                  </a>
                )}
                {app.linkedin_url && (
                  <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <Select
                  value={app.status}
                  onValueChange={(value) => updateApplicationStatus(app.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Applicant Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <span className="ml-2">{selectedApplication.applicant_name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2">{selectedApplication.applicant_email}</span>
                  </div>
                  {selectedApplication.applicant_phone && (
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2">{selectedApplication.applicant_phone}</span>
                    </div>
                  )}
                  {selectedApplication.availability_date && (
                    <div>
                      <span className="text-muted-foreground">Available from:</span>
                      <span className="ml-2">
                        {new Date(selectedApplication.availability_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedApplication.cover_letter && (
                <div>
                  <h3 className="font-semibold mb-2">Cover Letter</h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedApplication.cover_letter}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <Textarea
                  placeholder="Add notes about this candidate..."
                  value={selectedApplication.notes || ""}
                  onChange={(e) => {
                    setSelectedApplication({
                      ...selectedApplication,
                      notes: e.target.value,
                    });
                  }}
                  rows={4}
                />
                <Button
                  className="mt-2"
                  onClick={() =>
                    updateNotes(selectedApplication.id, selectedApplication.notes || "")
                  }
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
