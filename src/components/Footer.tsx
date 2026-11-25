import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PlasteraLogo from "./PlasteraLogo";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={"site-footer " + s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.identity}>
            <PlasteraLogo className={s.brand} />
            <p>
              Machines et matières
              <br />
              pour la plasturgie.
            </p>
          </div>
          <nav className={s.navigation} aria-label="Navigation du pied de page">
            <h2 className={s.heading}>Découvrir</h2>
            <Link href="/machines">Machines Shibaura</Link>
            <Link href="/matieres-premieres">Matières premières</Link>
            <Link href="/applications">Applications</Link>
            <Link href="/expertise">Notre expertise</Link>
          </nav>
          <div className={s.contact}>
            <h2 className={s.heading}>Échanger</h2>
            <Link className={s.project} href="/contact">
              Présenter votre projet{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a
              className={s.email}
              href="mailto:contact@plastera-europe.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact@plastera-europe.com
            </a>
          </div>
        </div>
        <div className={s.bottom}>
          <span>© 2026 Plastera</span>
          <Link href="/contact#confidentialite">Confidentialité</Link>
          <p>Représentant exclusif Shibaura Machine en France</p>
        </div>
      </div>
    </footer>
  );
}
