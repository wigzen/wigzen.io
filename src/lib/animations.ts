/**
 * Shared GSAP animation configuration helpers.
 * Import these in Astro component <script> blocks for consistent animation patterns.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Default ScrollTrigger config for section reveals */
export function createSectionReveal(
  trigger: string | Element,
  targets: string | Element | Element[],
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  }
) {
  const { y = 40, stagger = 0.15, duration = 0.8, start = "top 85%" } =
    options ?? {};

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none none",
    },
  });
}

/** Parallax scroll effect */
export function createParallax(
  trigger: string | Element,
  target: string | Element,
  options?: {
    yPercent?: number;
    start?: string;
    end?: string;
  }
) {
  const {
    yPercent = -20,
    start = "top bottom",
    end = "bottom top",
  } = options ?? {};

  return gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  });
}

/** Count-up animation for stat numbers */
export function createCountUp(
  element: Element,
  endValue: number,
  options?: {
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
  }
) {
  const {
    duration = 2,
    decimals = 0,
    suffix = "",
    prefix = "",
  } = options ?? {};

  const obj = { val: 0 };

  return gsap.to(obj, {
    val: endValue,
    duration,
    ease: "power2.out",
    onUpdate() {
      element.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
    },
  });
}
