
import { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (

      <main className="flex flex-1 flex-col pr-7 pl-7">{children}</main>
      
  );
}
