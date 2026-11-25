export const SHUTTER_SLICES = 14;
export const SHUTTER_DURATION = 1.25;
export const SHUTTER_INTERVAL = 6500;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function shutterProgress(
  progress: number,
  index: number,
  count = SHUTTER_SLICES,
) {
  const local = clamp((clamp(progress) - (index / count) * 0.5) / 0.5);
  return 1 - Math.pow(1 - local, 3);
}

export function shutterSlit(
  pointer: number,
  index: number,
  count = SHUTTER_SLICES,
) {
  const distance = Math.abs(clamp(pointer) * count - index - 0.5);
  return distance >= 2.5
    ? 0
    : (1 + Math.cos((distance / 2.5) * Math.PI)) * 0.16;
}

export function shutterScrollIndex(progress: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.floor(clamp(progress) * count)));
}

export const SHUTTER_TYPE_DELAY = 0.035;

export function shutterReadingInterval(characters: number) {
  return Math.max(
    SHUTTER_INTERVAL,
    Math.max(0, characters) * SHUTTER_TYPE_DELAY * 1000 + 2800,
  );
}

export const shutterStatements = [
  [
    { text: "Des presses Shibaura ", muted: false },
    { text: "tout-électriques ", muted: true },
    { text: "pour transformer vos matières en pièces ", muted: false },
    { text: "précises, régulières et performantes.", muted: true },
  ],
  [
    { text: "Des robots Shibaura ", muted: false },
    { text: "pour automatiser ", muted: true },
    {
      text: "la manutention, l’assemblage et le chargement de vos équipements avec ",
      muted: false,
    },
    { text: "précision et régularité.", muted: true },
  ],
  [
    { text: "Des matières de commodité aux ", muted: false },
    { text: "polymères techniques, ", muted: true },
    { text: "nous sélectionnons les grades adaptés à votre ", muted: false },
    { text: "procédé et à vos pièces.", muted: true },
  ],
] as const;
