import { useEffect } from "react";

/**
 * A hook that runs whenever the given element enters the viewport
 *
 * @param ref for element to observe
 * @param onEnter will be called when element enters the viewport
 * @param options for configuring the observer
 *
 * @example
 * const ref = React.useRef(null)
 *
 * useIntersectionObserver(() => console.log("intersecting"))
 *
 * <Element ref={ref} />
 */
export function useIntersectionObserver(
  ref: React.MutableRefObject<HTMLElement | null>,
  onEnter: () => void,
  options?: Partial<IntersectionObserverInit>
) {
  useEffect(() => {
    if (ref.current === null) return;
    const subject = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onEnter();
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
  }, [ref, onEnter, options]);
}
