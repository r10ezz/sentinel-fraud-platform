"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import LiveAlertListener from "@/components/socket/live-alert-listener";
import useLiveUpdates from "@/hooks/use-live-updates";

function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useLiveUpdates();

  return (
    <>
      <LiveAlertListener />
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <QueryClientProvider client={queryClient}>
        <AppProviders>{children}</AppProviders>
      </QueryClientProvider>
    </ThemeProvider>
  );
}