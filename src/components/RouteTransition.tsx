import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

export function RouteTransition({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const element = container.current;
    if (!element || typeof element.animate !== "function") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = element.animate([{ opacity: 0.96 }, { opacity: 1 }], {
      duration: 160,
      easing: "ease-out",
    });
    return () => animation.cancel();
  }, [pathname]);

  return <div ref={container}>{children}</div>;
}