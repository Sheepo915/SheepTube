import { PropsWithChildren } from "react";

export function SidebarSection({ children }: PropsWithChildren) {
  return <div className="py-2.5">{children}</div>;
}
