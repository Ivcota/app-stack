import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export function useSignIn() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: SignInData) => {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message ?? "Failed to sign in");
      }

      return result.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}

export function useSignUp() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: SignUpData) => {
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name ?? data.email.split("@")[0],
      });
      if (result.error) {
        throw new Error(result.error.message ?? "Failed to create account");
      }
      return result.data;
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
