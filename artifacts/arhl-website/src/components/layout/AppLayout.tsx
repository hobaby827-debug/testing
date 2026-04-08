import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Ticker } from "./Ticker";
import { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer />
      <Ticker />
    </div>
  );
}
