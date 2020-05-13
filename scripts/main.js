const app = new PIXI.Application({
    width: window.innerWidth, height: window.innerHeight, backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

const width = 50;
const height = 50;

const pixels = [];
for(let x = 0; x < width; x++){
  for(let y = 0; y < height; y++){
    let pixel = {
      gr: new PIXI.Graphics(),
      x, y,
      active: false,
    }
    container.addChild(pixel.gr);
    pixels.push(pixel);
  }
}

const drawPixel = ({ gr, x, y, active }) => {
  const xw = window.innerWidth / width;
  const yh = window.innerHeight / height;
  gr.clear()
    .lineStyle(1, 0)
    .beginFill(active ? 0xff0000 : 0x1099bb)
    .drawRect(x * xw, y * yh, xw, yh)
    .endFill();
}

const snake = {
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
  dir: 'right',
}

window.addEventListener('keydown', ({ keyCode }) => {
  switch(keyCode){
    case 37:
      snake.dir = 'left';
      break;
    case 39:
      snake.dir = 'right';
      break;
    case 38:
      snake.dir = 'top';
      break;
    case 40:
      snake.dir = 'bottom';
      break;
  }
})

let vel = 10;
let count = 0;
// Listen for animate update
app.ticker.add((delta) => {
  count++;

  if(count % 30 === 0 && vel > 1) vel--;
  if(count % vel === 0){
    switch(snake.dir){
      case 'left':
        snake.x--;
        break;
      case 'right':
        snake.x++;
        break;
      case 'top':
        snake.y--;
        break;
      case 'bottom':
        snake.y++;
        break;
    }

    pixels.forEach((pixel) => {
      const { x, y, active } = pixel;
      var touch = x === snake.x && y === snake.y;
      if(active && touch){
        alert('die');
      }
      if(touch) pixel.active = true;
    });
  }

  pixels.forEach(drawPixel);
});
