"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/data/catalog";
import { tanker } from "@/lib/fonts";
import { getApplicationRailState } from "@/lib/applicationRail";
import s from "./IndustrialApplications.module.css";

const ease = [0.16, 1, 0.3, 1] as const;
const readRail = (node: HTMLElement) =>
  getApplicationRailState(
    node.scrollLeft,
    node.clientWidth,
    node.scrollWidth,
    Array.from(
      node.querySelectorAll<HTMLElement>("[data-application-card]"),
      (card) => ({ left: card.offsetLeft, width: card.offsetWidth }),
    ),
  );

export default function IndustrialApplications() {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [overflow, setOverflow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let frame = 0;
    let disposed = false;
    const update = () => {
      if (disposed) return;
      const state = readRail(node);
      setActive(state.active);
      setOverflow(state.nextLeft !== null);
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    Array.from(node.children).forEach((card) => resize.observe(card));
    node.addEventListener("scroll", schedule, { passive: true });
    document.fonts.ready.then(schedule);
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      node.removeEventListener("scroll", schedule);
    };
  }, []);

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        sync();
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!overflow || !visible || reduced || hovered || focused || interacted)
      return;
    const timer = window.setInterval(() => {
      const node = rail.current;
      if (!node) return;
      const { nextLeft } = readRail(node);
      if (nextLeft !== null)
        node.scrollTo({ left: nextLeft, behavior: "smooth" });
    }, 2000);
    return () => window.clearInterval(timer);
  }, [overflow, visible, reduced, hovered, focused, interacted]);

  const cardVariants: Variants = {
    hidden: (index: number) => ({ opacity: 0, scale: index === 0 ? 1 : 0.98 }),
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reduced ? 0 : 0.8, ease },
    },
  };
  const reveal = (delay: number): Variants => ({
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease,
      },
    },
  });

  return (
    <section
      id="applications-industrielles"
      data-industrial-applications
      data-applications-layout="partners"
      className={tanker.variable + " " + s.section}
      aria-labelledby="industrial-applications-title"
    >
      <div className={s.inner}>
        <div className={s.layout}>
          <header className={s.header}>
            <h2 id="industrial-applications-title">
              Votre industrie.
              <br />
              Notre terrain d’action.
            </h2>
          </header>
          <div
            ref={rail}
            className={s.track}
            data-applications-list
            data-lenis-prevent-horizontal
            role="region"
            aria-label="Nos secteurs d’activité"
            tabIndex={0}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
            onPointerDown={() => setInteracted(true)}
            onKeyDown={() => setInteracted(true)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setFocused(false);
            }}
          >
            {sectors.map((sector, index) => (
              <motion.article
                key={sector.name}
                className={s.card}
                data-application-reveal
                data-application-card={index}
                data-active={active === index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                aria-labelledby={"application-card-title-" + index}
              >
                <div className={s.copy}>
                  <div>
                    <motion.h3
                      id={"application-card-title-" + index}
                      data-application-reveal
                      variants={reveal(0.15)}
                    >
                      {sector.name}
                    </motion.h3>
                    <motion.p
                      className={s.description}
                      data-application-reveal
                      variants={reveal(0.25)}
                    >
                      {sector.text}
                    </motion.p>
                  </div>
                  <div>
                    <motion.div
                      className={s.divider}
                      data-application-reveal
                      aria-hidden="true"
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: {
                          scaleX: 1,
                          transition: {
                            duration: reduced ? 0 : 0.6,
                            delay: reduced ? 0 : 0.35,
                            ease,
                          },
                        },
                      }}
                    />
                    <motion.div
                      className={s.ctaReveal}
                      data-application-reveal
                      variants={reveal(0.45)}
                      whileTap={reduced ? undefined : { scale: 0.98 }}
                    >
                      <Link
                        href={"/applications#secteur-" + index}
                        className={s.cta}
                        aria-label={
                          "Découvrir les applications : " + sector.name
                        }
                      >
                        <span className={s.ctaCircle} aria-hidden="true">
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </span>
                        <span>Découvrir ce secteur</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
                <div className={s.visual}>
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 80vw, (max-width: 1023px) 340px, (max-width: 1280px) 25vw, 360px"
                    className={s.photo}
                    style={{ objectPosition: sector.imagePosition }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
      <noscript>
        <style>
          {
            "[data-industrial-applications] [data-application-reveal] { opacity: 1 !important; transform: none !important; }"
          }
        </style>
      </noscript>
    </section>
  );
}
