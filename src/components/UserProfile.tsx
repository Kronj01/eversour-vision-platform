
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Edit2, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserProfile = () => {
  const { user, profile, updateProfile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    avatar_url: profile?.avatar_url || ''
  });

  if (!user || !profile) {
    return null;
  }

  const handleSave = async () => {
    const { error } = await updateProfile(editData);
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      full_name: profile?.full_name || '',
      avatar_url: profile?.avatar_url || ''
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-400/20 shadow-2xl shadow-purple-500/10"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              onClick={handleSave}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatar_url || ''} alt={profile.full_name || 'User'} />
            <AvatarFallback className="bg-purple-600 text-white text-xl">
              {profile.full_name ? getInitials(profile.full_name) : <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-1">
              {profile.full_name || 'User'}
            </h3>
            <p className="text-gray-400">{profile.email}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.full_name}
                onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-white">
                {profile.full_name || 'Not set'}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <div className="px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-gray-400">
              {profile.email}
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Shield className="w-4 h-4 inline mr-2" />
              Role
            </label>
            <div className="px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                profile.role === 'admin' 
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                  : 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
              }`}>
                {profile.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Member Since
            </label>
            <div className="px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-white">
              {new Date(profile.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="pt-6 border-t border-gray-800">
          <Button
            onClick={signOut}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
