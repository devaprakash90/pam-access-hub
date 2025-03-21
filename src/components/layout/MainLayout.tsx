
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

export function MainLayout({ 
  children, 
  title, 
  showBackButton = false 
}: MainLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border shadow-subtle">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-secondary transition-all duration-300"
              >
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            )}
            <div className="flex items-center">
              {isHomePage ? (
                <h1 className="text-xl font-semibold text-foreground">
                  Privileged Access Management (PAM)
                </h1>
              ) : (
                <h1 className="text-xl font-semibold text-foreground">
                  {title || "PAM"}
                </h1>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-pam-blue text-white">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="cursor-pointer border border-border transition-all duration-300 hover:ring-2 hover:ring-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className={cn(
          "w-full animate-fade-in transition-all duration-300 ease-out",
        )}>
          {children}
        </div>
      </main>
      <footer className="py-6 border-t border-border bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Privileged Access Management
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}
