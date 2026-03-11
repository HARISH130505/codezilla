"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}


