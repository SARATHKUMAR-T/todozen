import React, { Children } from "react";
import NavBar from "@/components/NavBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="pt-16 min-h-screen">{children}</main>
    </>
  );
}
