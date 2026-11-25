"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 761px)",
        mobile: "(max-width: 760px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) return;
        const mobile = context.conditions?.mobile;
        const motion = gsap.context(() => {
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              const lines = element.querySelectorAll("[data-title-line]");
              if (lines.length) {
                gsap.from(lines, {
                  yPercent: 115,
                  rotation: 2,
                  duration: 0.85,
                  stagger: 0.1,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 87%",
                    once: true,
                  },
                });
                return;
              }
              gsap.from(element, {
                y: mobile ? 20 : 32,
                opacity: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 91%",
                  once: true,
                },
              });
            });

          gsap.utils
            .toArray<HTMLElement>("[data-universe-motion]")
            .forEach((card) => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: card,
                    start: "top 92%",
                    once: true,
                  },
                })
                .from(card, {
                  y: mobile ? 16 : 32,
                  opacity: 0,
                  clipPath: "inset(10% 0 0 0 round 8px)",
                  duration: 0.85,
                  ease: "power3.out",
                })
                .from(
                  card.querySelector("[data-universe-copy]"),
                  { y: 22, opacity: 0, duration: 0.7, ease: "power3.out" },
                  0.16,
                );
              gsap.fromTo(
                card.querySelector("[data-universe-media]"),
                { yPercent: -3 },
                {
                  yPercent: 3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                },
              );
            });
          const aperture = scope.querySelector<HTMLElement>(
            "[data-material-aperture]",
          );
          if (aperture) {
            gsap.fromTo(
              aperture.querySelector("[data-aperture-media]"),
              {
                clipPath: mobile
                  ? "inset(8% 10% round 70px)"
                  : "inset(10% 24% round 180px)",
              },
              {
                clipPath: "inset(0% 0% round 0px)",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: aperture,
                  start: "top 92%",
                  end: "top 22%",
                  scrub: 0.45,
                },
              },
            );
            gsap.fromTo(
              aperture.querySelector("img"),
              { scale: 1.15 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: aperture,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              },
            );
            gsap.from(aperture.querySelector("[data-aperture-copy]"), {
              y: 28,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: aperture,
                start: "top 66%",
                once: true,
              },
            });
          }
        }, scope);
        return () => motion.revert();
      },
    );

    let disposed = false;
    let frame = 0;
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const resize = new ResizeObserver(refresh);
    resize.observe(scope);
    const images = scope.querySelectorAll("img");
    images.forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      media.revert();
      images.forEach((image) => image.removeEventListener("load", refresh));
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
