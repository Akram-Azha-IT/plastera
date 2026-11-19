# Codrops Carousels, Demo 1

The homepage hero adapts Demo 1 from [barvian/CodropsCarousels](https://github.com/barvian/CodropsCarousels), created by Maxwell Barvian for Codrops, based on designs by Francesco Zagami.

The original `grow`, `text`, `text-up` and `progress` keyframes, 70cqw scroll panels and 30cqw text offset are adapted in `ProductHero.module.css`. React controls and a GSAP fallback extend the original implementation for accessibility and browser support. Original demo images and fonts are not bundled; the site uses its own existing Shibaura and polymer visuals.

The homepage adds a sticky vertical scroll journey that drives the original horizontal animation timelines. Horizontal gestures, keyboard navigation and direct scene selection share the same page scroll position; there is no timed autoplay.

## Homepage photography

- `public/images/hero-injection-hd.jpg` (5000 × 3092) and `public/images/hero-robotics-hd.png` (3744 × 3732): Shibaura Machine's [K-2025 Media Hub](https://shibaura-machine.com/k-2025-press/). Official EC-SXIII and TVM900 press visuals, used to illustrate the manufacturer's products. Original files are retained unchanged; presentation and framing are applied with CSS.
- `public/images/hero-polymers-hd.jpg` (6000 × 3368): [Pellet azul](https://commons.wikimedia.org/wiki/File:Pellet_azul.jpg), by ISIPLAST S.A de C.V, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The original photograph is retained unchanged; responsive cropping is applied with CSS. Public attribution and license links appear on `/credits-photos`, linked from the website footer. This photograph remains under CC BY-SA 4.0.

Upstream declares the MIT license in its README. Attribution and permission text are retained here.

## MIT License

Copyright (c) Maxwell Barvian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Plastera homepage photography and type

- hero-injection-production.jpg (1913 × 994): Shibaura Machine, https://shibaura-machine.com/media/h3ynti3o/new-berlin-interior-plant-enhanced.jpg. Manufacturing context illustration, not a Plastera customer reference.
- hero-robotics-cell.jpg (1903 × 800): TM Robotics, https://www.tmrobotics.com/images/slider/6/1903x800-Untitled%20design.jpg. SCARA robots in a work cell.
- hero-polypropylene.jpg (3500 × 2499): Quantum Chemical Corporation / Science History Institute, Polypropylene Pellets, via Wikimedia Commons, https://commons.wikimedia.org/wiki/File:Polypropylene_Pellets_-_DPLA_-_f7c2fa29d14525ce21219452f4a1a316.jpg. CC BY 4.0, https://creativecommons.org/licenses/by/4.0/. Original image retained, responsive framing applied with CSS.
- Montserrat regular and bold: the font family used by Shibaura Machine, self-hosted under the SIL Open Font License. See public/fonts/OFL-Montserrat.txt.
