import { useEffect } from "react";

export function useIntersectionObserver(
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
  options?: Partial<IntersectionObserverInit>
) {
  useEffect(() => {
    if (ref.current === null) return;
    const subject = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin || "0px",
        threshold: options?.threshold || 0.8,
      }
    );

    observer.observe(subject);

    return () => observer.disconnect();
  }, [ref, callback, options]);
}
