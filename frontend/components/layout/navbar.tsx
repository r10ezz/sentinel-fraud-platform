"use client";

import { Bell, Search, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const role = user?.role || "VIEWER";
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const roleBadgeStyle =
    role === "ADMIN"
      ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
      : role === "ANALYST"
      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
      : "bg-zinc-800 text-zinc-400 border-zinc-700";

  function handleLogout() {
    logout();
    toast.info("Logged out successfully");
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search transactions, cases, audit logs..."
          className="pl-10 border-zinc-800 bg-zinc-900/60"
        />
      </div>

      {/* Right Navigation & User Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/settings"
          className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
          title="Platform Settings"
        >
          <Settings size={18} />
        </Link>

        <div className="h-6 w-px bg-zinc-800" />

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-600 font-bold text-white text-xs">
              {userInitial}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-white leading-tight">
              {user?.name || "Sentinel User"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-block rounded px-1.5 py-0.2 text-[10px] font-semibold border ${roleBadgeStyle}`}
              >
                {role}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300 ml-2"
          title="Sign Out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}