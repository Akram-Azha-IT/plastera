# Plastera

Site vitrine pour la représentation exclusive de Shibaura Machine en France et la commercialisation de matières premières pour la plasturgie.

## Installation

Prérequis : Node.js 20.9 ou une version ultérieure et npm.

```sh
npm ci
npm run dev
```

Le serveur de développement est accessible sur http://localhost:3000.

## Production

```sh
npm run build
npm start
```

## Technologies

- Next.js 16, React 19 et TypeScript.
- CSS global et CSS Modules pour les styles adaptatifs.
- GSAP et ScrollTrigger pour les animations.
- Lenis pour le défilement sur ordinateur ; défilement tactile natif sur mobile.
- Lucide pour les icônes.

Les animations respectent la préférence système de réduction des mouvements.

## Structure

| Dossier          | Contenu                                                   |
| ---------------- | --------------------------------------------------------- |
| `src/app`        | Pages, mise en page et styles globaux                     |
| `src/components` | Navigation, hero, catalogues et composants partagés       |
| `src/data`       | Machines, matières premières et contenu du site           |
| `src/lib`        | Logique des filtres, animations et préparation des emails |
| `public`         | Images et ressources statiques                            |
| `scripts`        | Tests de la logique applicative                           |
| `docs`           | Sources des photographies                                 |

Le catalogue machines est organisé par familles. Les matières premières sont réparties entre commodités et matières techniques. Le hero de l’accueil adapte le carrousel Codrops Demo 1 et suit le défilement de la page.

`ExpertiseJourney.tsx` présente la machine et la matière dans une scène liée au défilement avec GSAP ScrollTrigger. La séquence se raccourcit sur mobile ; les écrans courts et la préférence de réduction des mouvements conservent les deux présentations accessibles sans blocage du défilement. `HomeMotion.tsx` coordonne les titres, la lecture progressive, l’ouverture du visuel matières et les entrées des applications industrielles. Chaque composant nettoie ses animations à la navigation.

La direction des transitions s’inspire des expériences [Sticky Grid Scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/) et [On-Scroll Expanding Image](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/) de Codrops, avec une implémentation propre au site.

## Contact

Le formulaire prépare un email prérempli à destination de `contact@plastera-europe.com` et ouvre la messagerie séparément. Le visiteur vérifie le contenu puis effectue l’envoi dans sa messagerie. Le site ne dispose pas de service d’envoi d’emails côté serveur et n’enregistre pas les champs du formulaire.

## Tests

```sh
npm run test:catalog
node scripts/check-material-selection.cjs
node scripts/check-material-gallery.cjs
node scripts/check-hero-carousel.cjs
node scripts/check-approach-orbit.cjs
node scripts/check-expertise-journey.cjs
node scripts/check-contact-email.cjs
```

`npm run build` vérifie également les types TypeScript et la génération des pages.

## Crédits

Les licences du carrousel et des photographies sont détaillées dans [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Les sources des images industrielles figurent dans [docs/application-image-sources.md](docs/application-image-sources.md). Les crédits photographiques sont également accessibles sur la page `/credits-photos` du site.
