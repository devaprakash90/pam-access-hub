
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface TileProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  to: string;
  badge?: number;
  className?: string;
}

export function Tile({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  badge, 
  className 
}: TileProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative overflow-hidden bg-white border border-border rounded-lg p-6",
        "shadow-subtle hover:shadow-elevation transition-all duration-300",
        "transform hover:-translate-y-1 active:translate-y-0 active:shadow-subtle",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pam-blue to-pam-blue-light transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
      
      <div className="flex items-start space-x-4">
        <div className="bg-pam-blue-light p-2.5 rounded-md text-pam-blue flex-shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg text-foreground">{title}</h3>
            {typeof badge === 'number' && (
              <Badge className="bg-pam-blue text-white ml-2">{badge}</Badge>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-pam-blue-light/20 rounded-tl-[100px] transform translate-x-8 translate-y-8 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300 ease-in-out" />
    </Link>
  );
}
