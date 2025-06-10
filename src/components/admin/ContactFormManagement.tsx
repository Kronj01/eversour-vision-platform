
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Calendar, User } from 'lucide-react';

const ContactFormManagement = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Contact Form Management
          </CardTitle>
          <CardDescription className="text-gray-400">
            View and manage contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Contact Forms Coming Soon</h3>
            <p className="text-gray-400 mb-6">
              Contact form backend implementation is pending. Once implemented, you'll be able to:
            </p>
            <div className="text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-purple-400" />
                View all form submissions
              </div>
              <div className="flex items-center text-gray-300">
                <User className="w-4 h-4 mr-3 text-purple-400" />
                Manage user inquiries
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-purple-400" />
                Track submission dates
              </div>
              <div className="flex items-center text-gray-300">
                <MessageSquare className="w-4 h-4 mr-3 text-purple-400" />
                Respond to messages
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactFormManagement;
