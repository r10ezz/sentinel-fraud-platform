"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Shield } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { useLogin } from "@/hooks/use-login";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const mutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    try {
      const data = await mutation.mutateAsync(values);

      localStorage.setItem("token", data.token);

      toast.success("Welcome back!");

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">

      <Card className="w-full max-w-md p-8">

        <div className="mb-8 flex flex-col items-center">

          <Shield className="mb-3 h-12 w-12 text-blue-500" />

          <h1 className="text-3xl font-bold">
            Sentinel
          </h1>

          <p className="mt-2 text-zinc-500">
            Enterprise Fraud Intelligence
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input
            placeholder="Email"
            {...register("email")}
          />

          <div className="relative">

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing In..." : "Sign In"}
          </Button>

        </form>

      </Card>

    </main>
  );
}