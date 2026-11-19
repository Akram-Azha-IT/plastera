import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Crédits photos | Plastera",
  description:
    "Sources et crédits des photographies présentées sur le site Plastera.",
};

export default function PhotoCredits() {
  return (
    <>
      <PageIntro
        eyebrow="Plastera"
        title="Crédits photos"
        description="Sources et crédits des photographies présentées sur le site."
      />
      <div className={`shell page-content ${s.credits}`}>
        <section aria-labelledby="credits-machines">
          <h2 id="credits-machines">Visuels machines</h2>
          <p>
            Visuels officiels des presses EC-SXIII et du robot TVM900 : Shibaura
            Machine. Source :{" "}
            <a href="https://shibaura-machine.com/k-2025-press/">
              K-2025 Media Hub
            </a>
            .
          </p>
          <p>
            Photographie d’atelier d’injection :{" "}
            <a href="https://shibaura-machine.com/injection-molding-machines/">
              Shibaura Machine
            </a>
            . Cellule de robots SCARA :{" "}
            <a href="https://www.tmrobotics.com/">TM Robotics</a>. Ces visuels
            illustrent les équipements et leurs applications industrielles.
          </p>
        </section>
        <section aria-labelledby="credits-polymeres">
          <h2 id="credits-polymeres">Photographie des polymères</h2>
          <p>
            <a href="https://commons.wikimedia.org/wiki/File:Polypropylene_Pellets_-_DPLA_-_f7c2fa29d14525ce21219452f4a1a316.jpg">
              Polypropylene Pellets
            </a>
            , Quantum Chemical Corporation / Science History Institute, via
            Wikimedia Commons. Licence{" "}
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
            . Photographie originale conservée ; cadrage adapté par CSS.
          </p>
          <p>
            <a href="https://commons.wikimedia.org/wiki/File:Pellet_azul.jpg">
              Pellet azul
            </a>
            , par ISIPLAST S.A de C.V., via Wikimedia Commons.
          </p>
          <p>
            Licence{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution, partage dans les mêmes conditions
              4.0 International (CC BY-SA 4.0)
            </a>
            . La photographie est recadrée pour les différents formats d’écran.
          </p>
        </section>
      </div>
    </>
  );
}
