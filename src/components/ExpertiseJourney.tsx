"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollPageTo } from "@/lib/pageScroll";
import { createExpertiseJourney } from "@/lib/expertiseJourney";
import s from "./ExpertiseJourney.module.css";

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    label: "Machine",
    eyebrow: "TECHNOLOGIE SHIBAURA MACHINE",
    title: "La force de",
    accent: "la précision.",
    description:
      "L’injection tout-électrique au service de vos pièces. Nous vous accompagnons dans le choix de la presse, de ses équipements et de son intégration à votre production.",
    features: [
      "Gamme EC-SXIII",
      "INJECTVISOR-V70",
      "Représentation exclusive en France",
    ],
    image: "/images/hero-injection-hd.jpg",
    alt: "Presse à injecter tout-électrique Shibaura Machine EC3000SXIII",
    caption: "EC3000SXIII",
    detail: "Injection tout-électrique",
    href: "/machines",
    action: "Explorer les machines",
  },
  {
    label: "Matière",
    eyebrow: "MATIÈRES PREMIÈRES POUR LA PLASTURGIE",
    title: "Tout commence",
    accent: "par la matière.",
    description:
      "De la commodité aux polymères techniques, le bon grade pour votre application. Nous sélectionnons les matières selon votre procédé, les propriétés recherchées et les exigences de vos pièces.",
    features: [
      "Commodités",
      "Polymères techniques",
      "Sélection selon votre application",
    ],
    image: "/images/hero-polymers-hd.jpg",
    alt: "Granulés de polymère bleus photographiés en gros plan",
    caption: "Du granulé à la pièce",
    detail: "Commodités et matières techniques",
    href: "/matieres-premieres",
    action: "Trouver votre matière",
  },
] as const;

export default function ExpertiseJourney() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    // Short screens and reduced motion use the complete, unpinned layout.
    media.add(
      "(min-height: 700px) and (prefers-reduced-motion: no-preference)",
      () => {
        node.dataset.enhanced = "true";
        setEnhanced(true);
        const context = gsap.context(() => {
          const stage = node.querySelector<HTMLElement>(
            "[data-journey-stage]",
          )!;
          const visuals = node.querySelectorAll<HTMLElement>(
            "[data-journey-visual]",
          );
          const copies = node.querySelectorAll<HTMLElement>(
            "[data-journey-copy]",
          );
          const animation = createExpertiseJourney(
            {
              machine: visuals[0],
              material: visuals[1],
              machineCopy: copies[0],
              materialCopy: copies[1],
              progress: node.querySelector("[data-journey-progress]"),
            },
            {
              scrollTrigger: {
                trigger: node,
                start: () => "top " + getComputedStyle(stage).top,
                end: () =>
                  "+=" + Math.max(1, node.offsetHeight - stage.offsetHeight),
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            },
          );
          let current = -1;
          animation.eventCallback("onUpdate", () => {
            const next = animation.progress() >= 0.5 ? 1 : 0;
            if (current !== next) {
              current = next;
              setActive(next);
            }
          });
          setActive(animation.progress() >= 0.5 ? 1 : 0);
          trigger.current = animation.scrollTrigger ?? null;
        }, node);
        return () => {
          context.revert();
          trigger.current = null;
          node.dataset.enhanced = "false";
          setEnhanced(false);
          setActive(0);
        };
      },
    );
    media.add(
      "(max-width: 760px) and (max-height: 699px) and (prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const rail = node.querySelector<HTMLElement>("[data-journey-scenes]");
          if (!rail) return;
          node
            .querySelectorAll<HTMLElement>("[data-scene]")
            .forEach((scene) => {
              gsap.fromTo(
                scene.querySelector("img"),
                { xPercent: -3, scale: 1.06 },
                {
                  xPercent: 3,
                  ease: "none",
                  scrollTrigger: {
                    trigger: scene,
                    scroller: rail,
                    horizontal: true,
                    start: "left right",
                    end: "right left",
                    scrub: 0.25,
                  },
                },
              );
            });
        }, node);
        return () => context.revert();
      },
    );
    let disposed = false;
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    const images = node.querySelectorAll("img");
    images.forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);
    return () => {
      disposed = true;
      media.revert();
      images.forEach((image) => image.removeEventListener("load", refresh));
    };
  }, []);

  return (
    <section
      ref={root}
      id="expertises"
      className={s.journey}
      data-enhanced={enhanced}
      aria-label="Machines et matières, deux expertises pour votre production"
    >
      <div className={s.stage} data-journey-stage>
        <div className={s.header}>
          <span className={s.intro}>Deux expertises. Une même ambition.</span>
          <div className={s.switcher} aria-label="Aller à une expertise">
            {scenes.map((scene, index) => (
              <button
                type="button"
                key={scene.label}
                aria-pressed={active === index}
                aria-controls={id + index}
                onClick={() => {
                  const current = trigger.current;
                  if (current)
                    scrollPageTo(
                      current.start +
                        (index === 0 ? 0.1 : 0.9) *
                          (current.end - current.start),
                    );
                }}
              >
                {scene.label}
              </button>
            ))}
          </div>
        </div>
        <div className={s.scenes} data-journey-scenes>
          {scenes.map((scene, index) => (
            <article
              key={scene.label}
              id={id + index}
              className={s.scene}
              data-scene={index}
            >
              <div
                className={s.copy}
                data-journey-copy
                aria-hidden={enhanced && active !== index}
                inert={enhanced && active !== index}
              >
                <span className={s.eyebrow}>{scene.eyebrow}</span>
                <h2>
                  {scene.title}
                  <br />
                  <span>{scene.accent}</span>
                </h2>
                <p>{scene.description}</p>
                <ul className={s.features}>
                  {scene.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link href={scene.href} className={s.action}>
                  {scene.action}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
              <figure className={s.visual} data-journey-visual>
                <div className={s.photo}>
                  <Image
                    src={scene.image}
                    alt={scene.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 760px) 90vw, 48vw"
                    className={index === 0 ? s.machine : s.material}
                  />
                </div>
                <figcaption>
                  <strong>{scene.caption}</strong>
                  <span>{scene.detail}</span>
                </figcaption>
                <span className={s.corners} aria-hidden="true" />
              </figure>
            </article>
          ))}
        </div>
        <div className={s.footer} aria-hidden="true">
          <span>De l’équipement à la matière, pensés ensemble.</span>
          <span className={s.progress}>
            <span data-journey-progress />
          </span>
        </div>
      </div>
    </section>
  );
}
