export const windowSizer = (canvas: HTMLCanvasElement, widthOffset: number = 0, heightOffset: number = 0) : void => {
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let dpi = window.devicePixelRatio;

  console.log('WINDOW: ', dpi)

  //can add 500 offset here for side nav
  let s = Math.max(wh + heightOffset, ww + widthOffset);

  canvas.width = s + dpi;
  canvas.height = s + dpi;

  canvas.style.width = s + "px";
  canvas.style.height = s + "px";
};