
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  MessageSquare, 
  Edit3,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ContactSubmission } from '@/hooks/useContactSubmissions';

interface ContactSubmissionCardProps {
  submission: ContactSubmission;
  onStatusChange: (id: string, status: ContactSubmission['status']) => void;
  onNotesUpdate: (id: string, notes: string) => void;
}

const ContactSubmissionCard = ({ 
  submission, 
  onStatusChange, 
  onNotesUpdate 
}: ContactSubmissionCardProps) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(submission.admin_notes || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSaveNotes = () => {
    onNotesUpdate(submission.id, notes);
    setIsEditingNotes(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-lg">{submission.name}</CardTitle>
              <CardDescription className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {submission.email}
              </CardDescription>
            </div>
            <Badge className={`${getStatusColor(submission.status)} text-white`}>
              {submission.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {submission.phone && (
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                {submission.phone}
              </div>
            )}
            {submission.company && (
              <div className="flex items-center gap-2 text-gray-300">
                <Building className="w-4 h-4 text-purple-400" />
                {submission.company}
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-purple-400" />
              {formatDate(submission.created_at)}
            </div>
            {submission.service_interest && (
              <div className="flex items-center gap-2 text-gray-300">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                {submission.service_interest}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Message:</h4>
            <p className="text-gray-300 bg-gray-800/50 p-3 rounded-lg">{submission.message}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Admin Notes:</h4>
              {!isEditingNotes ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingNotes(true)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveNotes}
                    className="text-green-400 hover:text-green-300"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsEditingNotes(false);
                      setNotes(submission.admin_notes || '');
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {isEditingNotes ? (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add admin notes..."
                className="bg-gray-800/50 border-gray-700 text-white"
                rows={3}
              />
            ) : (
              <p className="text-gray-300 bg-gray-800/50 p-3 rounded-lg min-h-[2.5rem]">
                {submission.admin_notes || 'No notes added yet...'}
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(submission.id, 'read')}
              disabled={submission.status === 'read'}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Mark as Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(submission.id, 'replied')}
              disabled={submission.status === 'replied'}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Mark as Replied
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(submission.id, 'closed')}
              disabled={submission.status === 'closed'}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactSubmissionCard;
