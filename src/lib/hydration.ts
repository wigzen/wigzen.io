/**
 * IntersectionObserver-based lazy hydration utility.
 * Use for fine-grained control beyond Astro's built-in `client:visible`.
 */

export interface LazyHydrationOptions extends IntersectionObserverInit {
  /** Pre-load assets before triggering hydration */
  preload?: () => Promise<void>;
}

export function createLazyHydrationObserver(
  element: HTMLElement,
  callback: () => void,
  options?: LazyHydrationOptions
): IntersectionObserver {
  const { preload, ...observerOptions } = options ?? {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (preload) {
            preload().then(callback);
          } else {
            callback();
          }
          break;
        }
      }
    },
    { threshold: 0.1, ...observerOptions }
  );

  observer.observe(element);
  return observer;
}

/**
 * Check if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Check if WebGL is supported.
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}
