
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn("mb-12", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}
