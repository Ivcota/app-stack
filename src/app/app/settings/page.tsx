import React from "react";
import SettingsForm from "./settings-form";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Update your account settings and preferences
        </p>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Information
        </h2>
        <SettingsForm />
      </div>
    </div>
  );
};

export default SettingsPage;
