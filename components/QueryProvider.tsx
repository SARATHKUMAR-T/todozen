"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
}
