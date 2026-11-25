type RailCard = { left: number; width: number };

export function getApplicationRailState(
  scrollLeft: number,
  viewportWidth: number,
  scrollWidth: number,
  cards: readonly RailCard[],
) {
  const maxScroll = Math.max(0, scrollWidth - viewportWidth);
  if (viewportWidth <= 0 || maxScroll <= 10 || cards.length === 0)
    return { active: -1, nextLeft: null };
  const center =
    Math.max(0, Math.min(maxScroll, scrollLeft)) + viewportWidth / 2;
  let active = 0;
  let closest = Infinity;
  cards.forEach((card, index) => {
    const distance = Math.abs(center - (card.left + card.width / 2));
    if (distance < closest) {
      closest = distance;
      active = index;
    }
  });
  if (cards.length === 1) return { active, nextLeft: null };
  if (scrollLeft >= maxScroll - 10) return { active, nextLeft: 0 };
  const next = cards[(active + 1) % cards.length];
  return {
    active,
    nextLeft: Math.max(
      0,
      Math.min(maxScroll, next.left + next.width / 2 - viewportWidth / 2),
    ),
  };
}
