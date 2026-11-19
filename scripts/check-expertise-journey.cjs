const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const loaded = { exports: {} };
const source = ts.transpileModule(
  fs.readFileSync(
    path.join(__dirname, "../src/lib/expertiseJourney.ts"),
    "utf8",
  ),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  },
).outputText;
new Function("module", "exports", "require", source)(
  loaded,
  loaded.exports,
  require,
);
const { createExpertiseJourney } = loaded.exports;

function journey() {
  const targets = {
    machine: { xPercent: 0, scale: 1, opacity: 1 },
    material: { clipPath: "inset(0% 0% 0% 100%)", scale: 1 },
    machineCopy: { y: 0, opacity: 1 },
    materialCopy: { y: 0, opacity: 1 },
    progress: { scaleX: 0 },
  };
  const animation = createExpertiseJourney(targets, { paused: true });
  animation.progress(0);
  return { targets, animation };
}

test("the scene keeps a full reading interval before and after the transition", () => {
  const { targets, animation } = journey();
  animation.progress(0.2);
  assert.equal(targets.machineCopy.opacity, 1);
  assert.equal(targets.materialCopy.opacity, 0);
  animation.progress(0.8);
  assert.equal(targets.machineCopy.opacity, 0);
  assert.equal(targets.materialCopy.opacity, 1);
  assert.equal(targets.material.scale, 1);
  animation.kill();
});

test("scrolling never produces an empty text stage", () => {
  const { targets, animation } = journey();
  for (let i = 0; i <= 100; i++) {
    animation.progress(i / 100);
    assert.ok(
      targets.machineCopy.opacity + targets.materialCopy.opacity >= 0.99,
    );
    assert.ok(Math.abs(targets.progress.scaleX - i / 100) < 0.001);
  }
  animation.kill();
});

test("reverse scrolling returns the machine and its text to their initial state", () => {
  const { targets, animation } = journey();
  animation.progress(1).progress(0.5).progress(0);
  assert.equal(targets.machine.opacity, 1);
  assert.equal(targets.machine.scale, 1);
  assert.equal(targets.machine.xPercent, 0);
  assert.equal(targets.machineCopy.opacity, 1);
  assert.equal(targets.machineCopy.y, 0);
  assert.equal(targets.materialCopy.opacity, 0);
  assert.equal(targets.progress.scaleX, 0);
  animation.kill();
});
