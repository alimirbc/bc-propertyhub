import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, Users, Home, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationHeader() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/properties", label: "Properties", icon: Building },
    { href: "/tenants", label: "Tenants", icon: Users },
  ];

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-xl font-bold text-blue-600">BC PropertyHub</h1>
          </Link>
          <nav className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center space-x-2",
                      isActive && "bg-blue-600 text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.href = "/api/logout"}
          className="flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
}