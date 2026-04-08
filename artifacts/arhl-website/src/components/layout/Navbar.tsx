import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/teams", label: "Teams" },
  { href: "/standings", label: "Standings" },
  { href: "/stats", label: "Stats" },
  { href: "/schedule", label: "Schedule" },
  { href: "/rulebook", label: "Rulebook" },
  { href: "/join", label: "Join" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: adminData } = useGetAdminMe();
  const logout = useAdminLogout();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-display text-2xl tracking-wider font-bold sm:inline-block text-primary">
              ARHL
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 font-display tracking-wide text-lg",
                  location === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile menu logo */}
        <Link href="/" className="flex items-center md:hidden ml-4">
          <span className="font-display text-2xl tracking-wider font-bold text-primary">
            ARHL
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            {adminData?.isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="text-sm font-medium font-display tracking-wide text-accent hover:text-accent/80 transition-colors"
                >
                  Admin
                </Link>
                <button
                  onClick={() => logout.mutate(undefined, { onSuccess: () => window.location.href = "/" })}
                  className="text-sm font-medium font-display tracking-wide text-muted-foreground hover:text-foreground transition-colors ml-4"
                >
                  Logout
                </button>
              </>
            ) : null}
          </nav>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/40 bg-background px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block text-lg font-display tracking-wide",
                location === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
