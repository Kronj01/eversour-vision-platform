import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Download, 
  UserMinus,
  AlertTriangle,
  Check
} from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';

interface BulkUserActionsProps {
  selectedUsers: string[];
  onClearSelection: () => void;
}

const BulkUserActions = ({ selectedUsers, onClearSelection }: BulkUserActionsProps) => {
  const { bulkUpdateRoles, exportUsers } = useUserManagement();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkRoleUpdate = async () => {
    if (!selectedRole || selectedUsers.length === 0) return;

    setIsProcessing(true);
    try {
      const result = await bulkUpdateRoles(selectedUsers, selectedRole);
      if (result.success) {
        onClearSelection();
        setSelectedRole('');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    exportUsers();
  };

  if (selectedUsers.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Bulk Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              Select users to perform bulk actions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800 border-purple-400/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Bulk Actions
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
            {selectedUsers.length} selected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role Update */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">
            Update Role for Selected Users
          </label>
          <div className="flex space-x-2">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select new role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleBulkRoleUpdate}
              disabled={!selectedRole || isProcessing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Update Roles
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Other Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-800">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button
            variant="outline"
            onClick={onClearSelection}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <Check className="w-4 h-4 mr-2" />
            Clear Selection
          </Button>
        </div>

        {/* Warning */}
        <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-400 text-sm font-medium">
                Bulk operations are permanent
              </p>
              <p className="text-yellow-400/80 text-xs mt-1">
                Please review your selection before proceeding with bulk actions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkUserActions;
