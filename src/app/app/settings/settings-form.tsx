"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserSettingsAction } from "@/app/actions/user-actions";
import { useActionState } from "react";

type SettingsFormProps = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function SettingsForm({ user }: SettingsFormProps) {
  const { id, name, email } = user;
  const [state, formAction, isPending] = useActionState(
    updateUserSettingsAction,
    {
      error: undefined,
      success: undefined,
    }
  );

  return (
    <div className="max-w-2xl">
      <form className="space-y-6" action={formAction}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input hidden name="id" defaultValue={id} />
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={name}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={email}
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {state.error && (
          <div className="text-red-600 text-sm">{state.error}</div>
        )}

        {state.success && (
          <div className="text-green-600 text-sm">
            User settings updated successfully!
          </div>
        )}

        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
