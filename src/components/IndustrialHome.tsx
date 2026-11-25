import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeMotion from "./HomeMotion";
import ShutterHero from "./ShutterHero";
import BusinessUniverses from "./BusinessUniverses";
import MachineFamilies from "./MachineFamilies";
import IndustrialApplications from "./IndustrialApplications";
import s from "./HomeExperience.module.css";
export default function IndustrialHome() {
  return (
    <HomeMotion>
      <ShutterHero />
      <BusinessUniverses />
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
      <IndustrialApplications />
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
              href="mailto:contact@plastera-europe.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@plastera-europe.com <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}
