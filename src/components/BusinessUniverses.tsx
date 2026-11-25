import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { tanker } from "@/lib/fonts";
import s from "./BusinessUniverses.module.css";

const universes = [
  {
    id: "machines",
    href: "/machines",
    eyebrow: "Représentant exclusif en France",
    title: ["Machines", "Shibaura"],
    description:
      "Presses à injecter, fonderie sous pression, machines-outils et robotique.",
    compactDescription: "Injection, fonderie, usinage et robotique.",
    image: "/images/hero-injection-production.jpg",
    action: "Explorer les machines",
  },
  {
    id: "matieres",
    href: "/matieres-premieres",
    eyebrow: "Polymères pour la plasturgie",
    title: ["Matières", "premières"],
    description:
      "Matières de commodité et polymères techniques, adaptés à vos applications.",
    compactDescription: "Commodités et polymères techniques.",
    image: "/images/hero-polypropylene.jpg",
    action: "Explorer les matières",
  },
] as const;

export default function BusinessUniverses() {
  return (
    <section
      id="vision"
      className={tanker.variable + " " + s.section}
      aria-labelledby="universes-title"
    >
      <div className={s.inner}>
        <header className={s.header}>
          <span className={s.eyebrow}>De l’équipement au polymère</span>
          <h2 id="universes-title">Deux univers pour votre production.</h2>
        </header>
        <div className={s.cards}>
          {universes.map((universe) => (
            <Link
              key={universe.id}
              href={universe.href}
              className={s.card}
              data-universe-motion
              data-universe={universe.id}
              aria-labelledby={universe.id + "-universe-title"}
              aria-describedby={universe.id + "-universe-description"}
            >
              <div className={s.media} data-universe-media aria-hidden="true">
                <Image
                  src={universe.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 44vw, (max-width: 1600px) 46vw, 720px"
                  className={s.image}
                />
              </div>
              <div className={s.shade} aria-hidden="true" />
              <span className={s.label}>{universe.eyebrow}</span>
              <div className={s.content} data-universe-copy>
                <h3 id={universe.id + "-universe-title"}>
                  {universe.title[0]}
                  <br />
                  {universe.title[1]}
                </h3>
                <p id={universe.id + "-universe-description"}>
                  <span className={s.full}>{universe.description}</span>
                  <span className={s.compact}>
                    {universe.compactDescription}
                  </span>
                </p>
                <span className={s.action}>
                  <span className={s.full}>{universe.action}</span>
                  <span className={s.compact}>Explorer</span>
                  <span className={s.arrow} aria-hidden="true">
                    <ArrowUpRight size={23} />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
