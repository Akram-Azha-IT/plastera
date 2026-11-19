import gsap from "gsap";

type JourneyTargets = {
  machine: gsap.TweenTarget;
  material: gsap.TweenTarget;
  machineCopy: gsap.TweenTarget;
  materialCopy: gsap.TweenTarget;
  progress: gsap.TweenTarget;
};

export function createExpertiseJourney(
  targets: JourneyTargets,
  options: gsap.TimelineVars = {},
) {
  return gsap
    .timeline({ defaults: { ease: "power2.inOut" }, ...options })
    .to(
      targets.machine,
      { xPercent: -7, scale: 0.94, opacity: 0, duration: 0.36 },
      0.28,
    )
    .fromTo(
      targets.material,
      { clipPath: "inset(0% 0% 0% 100%)", scale: 1.06 },
      { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.42 },
      0.3,
    )
    .to(targets.machineCopy, { y: -28, opacity: 0, duration: 0.3 }, 0.34)
    .fromTo(
      targets.materialCopy,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 },
      0.34,
    )
    .fromTo(
      targets.progress,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: "none" },
      0,
    );
}
