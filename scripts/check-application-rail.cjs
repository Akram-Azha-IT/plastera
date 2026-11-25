const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const loaded = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(
    path.join(__dirname, "../src/lib/applicationRail.ts"),
    "utf8",
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
new Function("module", "exports", source)(loaded, loaded.exports);
const { getApplicationRailState } = loaded.exports;
const cards = [
  { left: 4, width: 300 },
  { left: 328, width: 300 },
  { left: 652, width: 300 },
];

test("phone rail centers the next card and loops at the final edge", () => {
  assert.deepEqual(getApplicationRailState(0, 375, 968, cards), {
    active: 0,
    nextLeft: 290.5,
  });
  assert.deepEqual(getApplicationRailState(290.5, 375, 968, cards), {
    active: 1,
    nextLeft: 593,
  });
  assert.deepEqual(getApplicationRailState(593, 375, 968, cards), {
    active: 2,
    nextLeft: 0,
  });
});
test("desktop columns and empty or single-card lists never autoplay", () => {
  assert.deepEqual(getApplicationRailState(0, 800, 800, cards), {
    active: -1,
    nextLeft: null,
  });
  assert.deepEqual(getApplicationRailState(0, 375, 968, []), {
    active: -1,
    nextLeft: null,
  });
  assert.deepEqual(getApplicationRailState(0, 0, 968, cards), {
    active: -1,
    nextLeft: null,
  });
  assert.equal(
    getApplicationRailState(0, 375, 450, [{ left: 0, width: 450 }]).nextLeft,
    null,
  );
});
test("wide mobile rails loop even when the middle card remains nearest the center", () => {
  const wide = [
    { left: 4, width: 340 },
    { left: 368, width: 340 },
    { left: 732, width: 340 },
  ];
  assert.deepEqual(getApplicationRailState(0, 975, 1076, wide), {
    active: 1,
    nextLeft: 101,
  });
  assert.deepEqual(getApplicationRailState(101, 975, 1076, wide), {
    active: 1,
    nextLeft: 0,
  });
});
test("elastic overscroll never creates a target beyond the rail", () => {
  for (const position of [-30, 0, 50, 300, 593, 800]) {
    const state = getApplicationRailState(position, 375, 968, cards);
    assert.ok(state.active >= 0 && state.active < cards.length);
    assert.ok(state.nextLeft >= 0 && state.nextLeft <= 593);
  }
});
