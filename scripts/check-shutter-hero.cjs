const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const loaded = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/lib/shutterHero.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
new Function("module", "exports", source)(loaded, loaded.exports);
const {
  SHUTTER_SLICES,
  SHUTTER_DURATION,
  SHUTTER_INTERVAL,
  SHUTTER_TYPE_DELAY,
  shutterReadingInterval,
  shutterStatements,
  shutterProgress,
  shutterSlit,
  shutterScrollIndex,
} = loaded.exports;

test("all fourteen shutters start closed and finish fully open", () => {
  assert.equal(SHUTTER_SLICES, 14);
  for (let i = 0; i < 14; i++) {
    assert.equal(shutterProgress(0, i), 0);
    assert.equal(shutterProgress(1, i), 1);
  }
});
test("the reveal travels from left to right without exposing an out-of-range band", () => {
  for (let p = 0; p <= 100; p++) {
    let previous = 1;
    for (let i = 0; i < 14; i++) {
      const value = shutterProgress(p / 100, i);
      assert.ok(value >= 0 && value <= previous);
      previous = value;
    }
  }
  assert.ok(shutterProgress(0.2, 0) > 0);
  assert.equal(shutterProgress(0.2, 13), 0);
});
test("the cursor slit remains local, symmetric and bounded", () => {
  const x = 7 / 14;
  assert.equal(shutterSlit(x, 0), 0);
  assert.equal(shutterSlit(x, 13), 0);
  assert.ok(Math.abs(shutterSlit(x, 6) - shutterSlit(x, 7)) < 1e-8);
  for (let i = 0; i < 14; i++)
    assert.ok(shutterSlit(x, i) >= 0 && shutterSlit(x, i) <= 0.32);
});
test("scroll navigation covers the three products and clamps overscroll", () => {
  assert.deepEqual(
    [-1, 0, 0.4, 0.8, 1, 2].map((p) => shutterScrollIndex(p, 3)),
    [0, 0, 1, 2, 2, 2],
  );
});
test("automatic changes leave more than three seconds to read each scene", () => {
  assert.equal(SHUTTER_INTERVAL, 6500);
  assert.equal(SHUTTER_DURATION, 1.25);
  assert.ok(SHUTTER_INTERVAL - SHUTTER_DURATION * 1000 >= 3000);
});

test("every statement finishes typing before the next automatic scene", () => {
  assert.equal(shutterStatements.length, 3);
  for (const parts of shutterStatements) {
    const length = parts.reduce((sum, part) => sum + part.text.length, 0);
    const duration = length * SHUTTER_TYPE_DELAY * 1000;
    assert.ok(shutterReadingInterval(length) >= duration + 2800);
    assert.ok(shutterReadingInterval(length) >= SHUTTER_INTERVAL);
  }
  assert.equal(shutterReadingInterval(-10), SHUTTER_INTERVAL);
  assert.ok(shutterReadingInterval(1000) > shutterReadingInterval(100));
});
