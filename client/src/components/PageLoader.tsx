import { Suspense, ReactNode } from "react";

export function PageLoader({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div />}>{children}</Suspense>;
}
