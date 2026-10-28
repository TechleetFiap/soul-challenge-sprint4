import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}
