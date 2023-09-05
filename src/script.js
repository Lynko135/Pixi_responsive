import * as PIXI from "pixi.js";

let logicalWidth = window.innerWidth;
let logicalHeight = window.innerHeight;
let renderer = null;
let stage = null;
let mainContainer = null;
let bunny = null;

const animate = () => {
  requestAnimationFrame(animate);

  bunny.rotation += 0.05;
  renderer.render(stage);
};

const resizeHandler = () => {
  logicalWidth = window.innerWidth;
  logicalHeight = window.innerHeight;
  const scaleFactor = Math.min(
    window.innerWidth / logicalWidth,
    window.innerHeight / logicalHeight
  );
  const newWidth = Math.ceil(logicalWidth * scaleFactor);
  const newHeight = Math.ceil(logicalHeight * scaleFactor);

  renderer.view.style.width = `${newWidth}px`;
  renderer.view.style.height = `${newHeight}px`;

  renderer.resize(newWidth, newHeight);
  mainContainer.scale.set(scaleFactor);
  mainContainer.position.x = logicalWidth / 2;
  mainContainer.position.y = logicalHeight / 2;
};

const init = () => {
  renderer = PIXI.autoDetectRenderer(logicalWidth, logicalHeight, {
    roundPixels: true,
    resolution: window.devicePixelRatio || 1,
  });
  renderer.view.id = "pixi-canvas";

  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

  stage = new PIXI.Container();
  mainContainer = new PIXI.Container();
  stage.addChild(mainContainer);

  document.body.appendChild(renderer.view);
  window.addEventListener("resize", resizeHandler, false);

  resizeHandler();

  renderer.background.color = 0xffffff;

  bunny = PIXI.Sprite.from("https://pixijs.com/assets/bunny.png");
  bunny.anchor.set(0.5);
  mainContainer.addChild(bunny);
  animate();
};

init();
