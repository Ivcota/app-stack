"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    onSubmit: async (values) => {
      const {
        value: { username, email },
      } = values;

      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
        console.log("Form submitted:", { username, email });
        setSuccess("Settings updated successfully!");
      } catch {
        setError("Failed to update settings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="max-w-2xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <form.Field
            name="username"
            children={(field) => {
              return (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
              );
            }}
          />

          <form.Field
            name="email"
            children={(field) => {
              return (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
              );
            }}
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        {success && <div className="text-green-600 text-sm">{success}</div>}

        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
