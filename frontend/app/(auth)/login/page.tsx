"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Shield, ShieldCheck, UserCheck, Eye as EyeIcon } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { useLogin } from "@/hooks/use-login";
import { useAuthStore } from "@/store/auth-store";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const mutation = useLogin();
  const loginToStore = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@sentinel.com",
      password: "admin123",
    },
  });

  async function onSubmit(values: FormData) {
    try {
      const data = await mutation.mutateAsync(values);

      if (data.token && data.user) {
        loginToStore(data.token, data.user);
      } else {
        localStorage.setItem("token", data.token);
      }

      toast.success(`Welcome back, ${data.user?.name || "User"}!`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  }

  function fillDemo(email: string, pass: string) {
    setValue("email", email);
    setValue("password", pass);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 ring-1 ring-blue-500/30">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Sentinel
          </h1>

          <p className="mt-1 text-sm text-zinc-400">
            Enterprise Fraud & Risk Intelligence Platform
          </p>
        </div>

        {/* Demo Roles Quick Pick */}
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Quick Role Logins (Demo):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillDemo("admin@sentinel.com", "admin123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-500/20"
            >
              <ShieldCheck size={13} />
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillDemo("analyst@sentinel.com", "analyst123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-2 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/20"
            >
              <UserCheck size={13} />
              Analyst
            </button>
            <button
              type="button"
              onClick={() => fillDemo("viewer@sentinel.com", "viewer123")}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-2 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              <EyeIcon size={13} />
              Viewer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Email Address
            </label>
            <Input
              placeholder="name@sentinel.com"
              {...register("email")}
              className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-600"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="border-zinc-800 bg-zinc-950 pr-10 text-white placeholder:text-zinc-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-500"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing In..." : "Sign In to Platform"}
          </Button>
        </form>
      </Card>
    </main>
  );
}