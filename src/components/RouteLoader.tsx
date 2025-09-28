import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";

/**
 * Full-screen route change loader with smooth fade in/out.
 * - Waits briefly before showing to avoid flash on instant navigations
 * - Fades out smoothly after navigation completes
 */
interface RouteLoaderProps {
  delayMs?: number;
}

export function RouteLoader({ delayMs = 250 }: RouteLoaderProps) {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading" || navigation.state === "submitting";

  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const showDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ensure timers are cleared on unmount
  useEffect(() => {
    return () => {
      if (showDelayRef.current) clearTimeout(showDelayRef.current);
      if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
    };
  }, []);

  useEffect(() => {
    if (isNavigating) {
      if (hideDelayRef.current) {
        clearTimeout(hideDelayRef.current);
        hideDelayRef.current = null;
      }
      if (!shouldRender) {
        // Only show if navigation lasts beyond delayMs
        showDelayRef.current = setTimeout(() => {
          setShouldRender(true);
          requestAnimationFrame(() => setIsVisible(true));
        }, delayMs);
      } else {
        setIsVisible(true);
      }
    } else {
      // Start fade out immediately, then unmount after transition
      if (showDelayRef.current) {
        clearTimeout(showDelayRef.current);
        showDelayRef.current = null;
      }
      if (shouldRender) {
        setIsVisible(false);
        hideDelayRef.current = setTimeout(() => {
          setShouldRender(false);
        }, 200); // match transition duration
      }
    }
  }, [isNavigating, shouldRender]);

  const spinner = useMemo(() => (
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
    </div>
  ), []);

  if (!shouldRender) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={isVisible}
      className={`fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-sm transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col items-center gap-4">
        {spinner}
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}


