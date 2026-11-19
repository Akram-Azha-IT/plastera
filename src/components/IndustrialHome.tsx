import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeMotion from "./HomeMotion";
import MachineFamilies from "./MachineFamilies";
import ProductHero from "./ProductHero";
import ApproachOrbit from "./ApproachOrbit";
import ExpertiseJourney from "./ExpertiseJourney";
import { sectors } from "@/data/catalog";
import s from "./HomeExperience.module.css";
const reading =
  "La performance naît de la rencontre entre la bonne machine et la bonne matière.";
export default function IndustrialHome() {
  return (
    <HomeMotion>
      <ProductHero />
      <section id="vision" className={s.vision}>
        <div className="shell">
          <div className={s.visionTop}>
            <span className="eyebrow">UNE VISION D’ENSEMBLE</span>
            <span className={s.smallNote}>MACHINE + MATIÈRE + APPLICATION</span>
          </div>
          <h2 className={s.reading} data-reading>
            {reading.split(" ").map((word, i) => (
              <span data-reading-word key={i}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className={s.visionBottom} data-reveal>
            <span className={s.visionMark}>
              Une vision commune<span>machine et matière</span>
            </span>
            <p>
              Représentant exclusif Shibaura Machine en France, nous vous
              accompagnons dans vos projets d’équipement et fournissons les
              matières premières pour votre production.
            </p>
          </div>
        </div>
      </section>
      <ExpertiseJourney />
      <section className={s.catalog}>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">LES UNIVERS SHIBAURA MACHINE</span>
              <h2 data-motion-title>
                <span className={s.titleMask}>
                  <span data-title-line>Plusieurs savoir-faire</span>
                </span>
                <span className={s.titleMask}>
                  <span data-title-line>Une même exigence.</span>
                </span>
              </h2>
            </div>
            <Link href="/machines" className="text-link">
              Toutes les machines <ArrowUpRight size={18} />
            </Link>
          </div>
          <div data-reveal>
            <MachineFamilies />
          </div>
        </div>
      </section>
      <section className={s.materialBanner} data-material-aperture>
        <div className={s.bannerMedia} data-aperture-media>
          <Image
            src="/images/materials-editorial.png"
            alt="Composition illustrative de granulés de polymères"
            fill
            sizes="100vw"
            className={s.bannerPhoto}
          />
          <div className={s.bannerShade} />
        </div>
        <div className="shell">
          <div className={s.bannerCopy} data-aperture-copy>
            <span className="eyebrow">L’EXIGENCE À L’ÉCHELLE DU GRANULÉ</span>
            <h2>
              Petite matière.
              <br />
              Grandes possibilités.
            </h2>
            <p>
              Chaque application a ses exigences.
              <br />
              Chaque polymère a son rôle à jouer.
            </p>
            <Link className="button button-blue" href="/matieres-premieres">
              Explorer nos polymères <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className={s.sectors}>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">APPLICATIONS INDUSTRIELLES</span>
              <h2 data-motion-title>
                <span className={s.titleMask}>
                  <span data-title-line>Votre industrie.</span>
                </span>
                <span className={s.titleMask}>
                  <span data-title-line>Notre terrain d’action.</span>
                </span>
              </h2>
            </div>
            <p>
              Des solutions pour
              <br />
              vos contraintes de transformation.
            </p>
          </div>
          <div className={s.sectorList}>
            {sectors.map((sector, i) => (
              <Link
                href={"/applications#secteur-" + i}
                className={s.sectorRow}
                data-sector-motion
                key={sector.name}
              >
                <div className={s.sectorImage} data-sector-photo>
                  <Image
                    src={sector.image}
                    alt={sector.imageAlt}
                    fill
                    sizes="(max-width:600px) 80vw, 220px"
                    className={s.sectorPhoto}
                    style={{ objectPosition: sector.imagePosition }}
                  />
                </div>
                <div className={s.sectorText} data-sector-copy>
                  <h3>{sector.name}</h3>
                  <p>{sector.text}</p>
                </div>
                <span className={s.sectorArrow} data-sector-arrow>
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={s.approach}>
        <div className="shell">
          <div className={s.sectionTitle} data-reveal>
            <div>
              <span className="eyebrow">NOTRE APPROCHE</span>
              <h2 data-motion-title>
                <span className={s.titleMask}>
                  <span data-title-line>L’écoute d’abord.</span>
                </span>
                <span className={s.titleMask}>
                  <span data-title-line>La solution ensuite.</span>
                </span>
              </h2>
            </div>
            <Link href="/expertise" className="text-link">
              Découvrir Plastera <ArrowUpRight size={18} />
            </Link>
          </div>
          <ApproachOrbit />
        </div>
      </section>
      <section className={s.finalCta}>
        <div className="shell">
          <div className={s.ctaTop}>
            <span className="eyebrow">
              ET SI ON PARLAIT DE VOTRE PROCHAIN PROJET ?
            </span>
            <span className="eyebrow">FRANCE / PLASTERA</span>
          </div>
          <Link href="/contact" className={s.bigCta} data-reveal>
            <span>
              Passons à<br />
              la production.
            </span>
            <span className={s.ctaArrow}>
              <ArrowUpRight />
            </span>
          </Link>
          <div className={s.ctaBottom}>
            <p>
              Un besoin d’équipement. Une matière à sélectionner.
              <br />
              Commençons par un échange.
            </p>
            <a
              href="mailto:contact@azharplastics.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@azharplastics.com <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}
