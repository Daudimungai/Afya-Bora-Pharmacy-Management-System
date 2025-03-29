import React from 'react';
import { useStore } from '../store';
import { User, Building, Bell, Shield, Mail } from 'lucide-react';

export function Settings() {
  const { user } = useStore();

  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      description: 'Update your personal information and account settings',
    },
    {
      title: 'Pharmacy Information',
      icon: Building,
      description: 'Manage your pharmacy details and business information',
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure your notification preferences',
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Manage your security settings and password',
    },
    {
      title: 'Email Preferences',
      icon: Mail,
      description: 'Update your email notification settings',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="mt-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="mt-4 first:mt-0 p-4 bg-white rounded-lg shadow hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {section.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {user && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Logged in as: <span className="font-medium">{user.name}</span>
          </p>
          <p className="text-sm text-gray-500">
            Role: <span className="font-medium capitalize">{user.role}</span>
          </p>
        </div>
      )}
    </div>
  );
}