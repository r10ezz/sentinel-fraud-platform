"use client";

import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">

      <div>

        <h2 className="text-lg font-semibold">
          Dashboard
        </h2>

      </div>

      <button className="rounded-lg border border-zinc-800 p-2 hover:bg-zinc-900">

        <Bell size={18} />

      </button>

    </header>
  );
}