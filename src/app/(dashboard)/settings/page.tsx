import React from "react";
import SettingsForm from "./settings-form";
import { appRuntime } from "@/runtime";
import { getUser } from "@/app/services/user-services";
import { headers } from "next/headers";

const SettingsPage = async () => {
  const args = await headers();
  const user = await appRuntime.runPromise(getUser(args));

  if (user.error) {
    return (
      <div className="max-w-2xl">
        <p className="text-red-500">Error: {user.error}</p>
      </div>
    );
  }

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
        <SettingsForm
          user={{
            id: user.data?.id ?? "",
            email: user.data?.email ?? "",
            name: user.data?.name ?? "",
          }}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
