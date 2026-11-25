"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides } from "@/data/heroSlides";
import { tanker } from "@/lib/fonts";
import {
  SHUTTER_SLICES,
  SHUTTER_DURATION,
  SHUTTER_TYPE_DELAY,
  shutterReadingInterval,
  shutterStatements,
  shutterProgress,
  shutterSlit,
  shutterScrollIndex,
} from "@/lib/shutterHero";
import s from "./ShutterHero.module.css";

gsap.registerPlugin(ScrollTrigger);
const bands = Array.from({ length: SHUTTER_SLICES }, (_, index) => index);
const wrap = (index: number) =>
  ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;

export default function ShutterHero() {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const current = useRef(0);
  const desired = useRef(0);
  const busy = useRef(false);
  const reducedRef = useRef(true);
  const followFrame = useRef(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const typing = useRef<gsap.core.Timeline | null>(null);
  const lens = useRef<Array<(opacity: number) => void>>([]);
  const [base, setBase] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoBlocked, setVideoBlocked] = useState(false);
  const [manualVideo, setManualVideo] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const select = useCallback((index: number) => {
    const next = wrap(index);
    desired.current = next;
    if (busy.current || next === current.current) return;
    if (reducedRef.current) {
      current.current = next;
      setBase(next);
      setActive(next);
      return;
    }
    busy.current = true;
    setIncoming(next);
    setActive(next);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = media.matches;
      setReduced(media.matches);
    };
    sync();
    setReady(true);
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      cancelAnimationFrame(followFrame.current);
    };
  }, []);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node || incoming === null) return;
    const finish = () => {
      current.current = incoming;
      busy.current = false;
      setBase(incoming);
      setIncoming(null);
      followFrame.current = requestAnimationFrame(() =>
        select(desired.current),
      );
    };
    if (reduced) {
      finish();
      return;
    }
    const context = gsap.context(() => {
      const layers = node.querySelectorAll<HTMLElement>(
        "[data-shutter-incoming]",
      );
      const seams = node.querySelectorAll<HTMLElement>("[data-shutter-seam]");
      const setters = Array.from(layers, (layer) =>
        gsap.quickSetter(layer, "clipPath"),
      );
      const clock = { progress: 0 };
      gsap.to(clock, {
        progress: 1,
        duration: SHUTTER_DURATION,
        ease: "none",
        onUpdate: () =>
          setters.forEach((set, index) => {
            const value = shutterProgress(clock.progress, index);
            set("inset(0% " + (1 - value) * 100 + "% 0% 0%)");
            seams[index].style.left = value * 100 + "%";
            seams[index].style.opacity = value > 0 && value < 1 ? "1" : "0";
          }),
        onComplete: finish,
      });
    }, node);
    return () => {
      context.revert();
      node
        .querySelectorAll<HTMLElement>("[data-shutter-seam]")
        .forEach((seam) => {
          seam.style.opacity = "0";
        });
    };
  }, [incoming, reduced, select]);

  useLayoutEffect(() => {
    const node = root.current;
    const journey = track.current;
    if (!node || !journey || !ready || reduced) return;
    const context = gsap.context(() => {
      let last = 0;
      if (journey.offsetHeight - node.offsetHeight > 10)
        ScrollTrigger.create({
          trigger: journey,
          start: "top top",
          end: () =>
            "+=" + Math.max(1, journey.offsetHeight - node.offsetHeight),
          onUpdate: (self) => {
            if (journey.offsetHeight - node.offsetHeight <= 10) return;
            const index = shutterScrollIndex(self.progress, heroSlides.length);
            if (index !== last) {
              last = index;
              select(index);
            }
          },
        });
      gsap.from("[data-hero-enter]", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, node);
    let disposed = false;
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      context.revert();
    };
  }, [ready, reduced, select]);

  useLayoutEffect(() => {
    const node = heading.current;
    if (!node || !ready || reduced) return;
    const context = gsap.context(() => {
      typing.current = gsap
        .timeline()
        .fromTo(
          "[data-hero-char]",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.01,
            stagger: SHUTTER_TYPE_DELAY,
            ease: "none",
          },
        )
        .fromTo(
          "[data-typing-cursor]",
          { opacity: 1 },
          {
            opacity: 0.25,
            duration: 0.55,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        );
    }, node);
    return () => {
      context.revert();
      typing.current = null;
    };
  }, [active, ready, reduced]);

  useEffect(() => {
    typing.current?.paused(!visible);
  }, [visible, active, ready, reduced]);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          lens.current = Array.from(
            node.querySelectorAll<HTMLElement>("[data-shutter-lens]"),
            (band) =>
              gsap.quickTo(band, "opacity", {
                duration: 0.32,
                ease: "power2.out",
              }),
          );
        }, node);
        return () => {
          context.revert();
          lens.current = [];
        };
      },
    );
    return () => media.revert();
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!ready || reduced || !visible || paused || focused || hovered) return;
    const characters = shutterStatements[active].reduce(
      (count, part) => count + part.text.length,
      0,
    );
    const timer = window.setTimeout(
      () => select(active + 1),
      shutterReadingInterval(characters),
    );
    return () => window.clearTimeout(timer);
  }, [active, ready, reduced, visible, paused, focused, hovered, select]);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    if (!ready || !visible || paused || (reduced && !manualVideo)) {
      node.pause();
      return;
    }
    let alive = true;
    node.muted = true;
    node
      .play()
      .then(() => {
        if (alive) setVideoBlocked(false);
      })
      .catch(() => {
        if (alive) setVideoBlocked(true);
      });
    return () => {
      alive = false;
      node.pause();
    };
  }, [ready, visible, paused, reduced, manualVideo]);

  const togglePlayback = () => {
    if (paused || videoBlocked || (reduced && !manualVideo)) {
      setPaused(false);
      setManualVideo(true);
      video.current
        ?.play()
        .then(() => setVideoBlocked(false))
        .catch(() => setVideoBlocked(true));
    } else setPaused(true);
  };

  const slide = heroSlides[active];
  const statement = shutterStatements[active];
  const videoStopped = paused || videoBlocked || (reduced && !manualVideo);
  const paintStyle = (index: number, band: number): CSSProperties =>
    ({
      backgroundImage: "url(" + heroSlides[index].image + ")",
      left: -band * 100 + "%",
      "--focal": heroSlides[index].position,
      "--mobile-focal": heroSlides[index].mobilePosition,
    }) as CSSProperties;
  const characters = (text: string, prefix: string) =>
    Array.from(text).map((char, index) => (
      <span key={prefix + index} data-hero-char>
        {char}
      </span>
    ));

  return (
    <div ref={track} className={s.journey} data-motion={ready && !reduced}>
      <section
        ref={root}
        className={tanker.variable + " " + s.hero}
        data-hero
        data-carousel="shutter-14"
        aria-label="Machines Shibaura et matières premières"
        aria-roledescription="carrousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onPointerOver={(event) =>
          setHovered(Boolean((event.target as Element).closest("a, button")))
        }
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !lens.current.length) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width;
          lens.current.forEach((set, index) => set(shutterSlit(x, index)));
        }}
        onPointerLeave={() => {
          setHovered(false);
          lens.current.forEach((set) => set(0));
        }}
        onPointerDown={(event) => {
          if (!(event.target as Element).closest("a, button"))
            pointerStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        onPointerUp={(event) => {
          const start = pointerStart.current;
          pointerStart.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy))
            select(active + (dx < 0 ? 1 : -1));
        }}
      >
        <div className={s.shutters} aria-hidden="true">
          {bands.map((band) => (
            <div className={s.slice} key={band}>
              <div className={s.layer}>
                <div className={s.paint} style={paintStyle(base, band)} />
              </div>
              {incoming !== null && (
                <div className={s.incoming} data-shutter-incoming>
                  <div className={s.paint} style={paintStyle(incoming, band)} />
                </div>
              )}
              <span className={s.seam} data-shutter-seam />
              <span className={s.lens} data-shutter-lens />
            </div>
          ))}
        </div>
        <div className={s.veil} aria-hidden="true" />
        <div className={s.inner}>
          <div className={s.context}>
            <div className={s.preview} data-hero-enter>
              <video
                ref={video}
                src="/videos/shibaura-hero-preview.mp4"
                poster="/images/shibaura-video-poster.jpg"
                muted
                loop
                playsInline
                preload="none"
                width={640}
                height={360}
                aria-label="Présentation des équipements Shibaura Machine"
              />
              {ready && (
                <button
                  type="button"
                  className={s.videoToggle}
                  onClick={togglePlayback}
                  aria-label={
                    videoStopped
                      ? "Lire la vidéo et reprendre l’animation"
                      : "Mettre la vidéo et le carrousel en pause"
                  }
                  aria-pressed={!videoStopped}
                ></button>
              )}
            </div>
            <div className={s.copy} data-hero-enter>
              <div className={s.kicker}>
                <span>{slide.label}</span>
                <nav className={s.indicators} aria-label="Choisir un univers">
                  {heroSlides.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={"Afficher " + item.nav}
                      aria-pressed={index === active}
                      onClick={() => select(index)}
                    >
                      <span />
                    </button>
                  ))}
                </nav>
              </div>
              <h1
                ref={heading}
                className={s.headline}
                aria-label={statement.map((part) => part.text).join("")}
              >
                {statement.map((part, index) => (
                  <span
                    key={index}
                    className={part.muted ? s.muted : undefined}
                    aria-hidden="true"
                  >
                    {characters(part.text, "part-" + index + "-")}
                  </span>
                ))}
                <i className={s.cursor} data-typing-cursor aria-hidden="true" />
              </h1>
              <div className={s.actions}>
                <Link href={slide.href} className={s.primary}>
                  <span>{slide.action}</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
                <Link href="/contact" className={s.secondary}>
                  <span>Parlons de votre projet</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
