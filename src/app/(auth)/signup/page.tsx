"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useSignUp } from "@/hooks/useAuth";
import { useState } from "react";

export default function SignUp() {
  const signUpMutation = useSignUp();
  const [passwordError, setPasswordError] = useState("");
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const {
        value: { email, password, confirmPassword },
      } = values;

      setPasswordError("");

      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      signUpMutation.mutate({ email, password });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      className="mt-1"
                    />
                  </div>
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                return (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      required
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Confirm your password"
                      className="mt-1"
                    />
                  </div>
                );
              }}
            />
          </div>

          {(signUpMutation.error || passwordError) && (
            <div className="text-red-600 text-sm text-center">
              {passwordError || signUpMutation.error?.message}
            </div>
          )}

          <div>
            <Button type="submit" disabled={signUpMutation.isPending} className="w-full">
              {signUpMutation.isPending ? "Creating account..." : "Sign up"}
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-gray-600 hover:text-gray-500"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
