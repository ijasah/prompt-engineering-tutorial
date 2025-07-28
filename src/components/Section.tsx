import { ReactNode } from "react";
import { Separator } from "./ui/separator";

interface SectionProps {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const Section = ({ id, title, icon, children }: SectionProps) => {
  return (
    <section id={id} className="pt-20 pb-20">
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <Separator className="mb-8" />
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
};
