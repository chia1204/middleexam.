let button1, button2, button3, button4; // 主按鈕
let subButtons = []; // 儲存子選項按鈕
let sprite1, sprite2, sprite3, sprite4;
let sprite1Frames = [];
let sprite2Frames = [];
let sprite3Frames = [];
let sprite4Frames = [];
let currentFrame = 0; // 當前動畫幀
let activeSpriteFrames = null; // 當前顯示的動畫幀
let frameRate = 10; // 動畫速度
let iframe;
let triangles = [];

function preload() {
  sprite1 = loadImage('31.png');
  sprite2 = loadImage('32.png');
  sprite3 = loadImage('3.png');
  sprite4 = loadImage('41.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#FAEDCD");

  // 初始化 50 個靜止的正三角形
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(20, 50);

    let x1 = x;
    let y1 = y - size / Math.sqrt(3);
    let x2 = x - size / 2;
    let y2 = y + size / (2 * Math.sqrt(3));
    let x3 = x + size / 2;
    let y3 = y + size / (2 * Math.sqrt(3));

    triangles.push({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x3: x3,
      y3: y3,
      color: [random(255), random(255), random(255), 150]
    });
  }

  // 初始化主按鈕
  createButtonWithSprite('自我介紹', 50, 50, () => {
    hideSubButtons(); // 隱藏子選項
    activeSpriteFrames = sprite1Frames; // 顯示 31.png 的動畫
    updateIframe('https://chia1204.github.io/introduction/'); // 更新 iframe
  });

  createButtonWithSprite('作品集', 180, 50, () => {
    showSubButtons(); // 顯示子選項
    activeSpriteFrames = sprite2Frames; // 顯示 32.png 的動畫
    updateIframe(''); // 清空 iframe
  });

  createButtonWithSprite('測驗卷', 310, 50, () => {
    hideSubButtons(); // 隱藏子選項
    activeSpriteFrames = sprite3Frames; // 顯示 3.png 的動畫
    updateIframe('https://chia1204.github.io/quiz./'); // 更新 iframe
  });

  createButtonWithSprite('教學影片', 440, 50, () => {
    hideSubButtons(); // 隱藏子選項
    activeSpriteFrames = null; // 停止顯示動畫幀
    updateIframe('https://www.youtube.com/embed/C2k60AJJxKw'); // 嵌入教學影片
  });

  // 初始化子選項按鈕（隱藏）
  subButtons.push(createSubButton('第一週', 50, 120, 'https://chia1204.github.io/20250224/'));
  subButtons.push(createSubButton('第二週', 50, 180, 'https://chia1204.github.io/20250303/'));
  subButtons.push(createSubButton('第三週', 50, 240, 'https://chia1204.github.io/20250310/'));
  subButtons.push(createSubButton('第四週', 50, 300, 'https://chia1204.github.io/20250317./'));
  subButtons.push(createSubButton('第五週', 50, 360, 'https://chia1204.github.io/20250324/'));
  subButtons.push(createSubButton('第六週', 50, 420, 'https://chia1204.github.io/20250407./'));

  // 隱藏子選項按鈕
  subButtons.forEach(button => button.hide());

  // 分割圖片精靈
  for (let i = 0; i < 3; i++) {
    sprite1Frames.push(sprite1.get(i * 53, 0, 43, 64));
    sprite2Frames.push(sprite2.get(i * 56, 0, 43, 63));
    sprite3Frames.push(sprite3.get(i * 39, 0, 40, 63));
    sprite4Frames.push(sprite4.get(i * 50, 0, 45, 73));
  }

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.attribute('style', `
    display: block;
    margin: 0px auto;
    border: none;
    width: 70vw;
    height: 70vh;
    position: relative;
    top: -650px;
  `);
  //iframe.attribute('src', 'https://chia1204.github.io/self-introduction-/');
}

function draw() {
  background("#FAEDCD");

  let sizeFactor = map(mouseX, 0, width, 2, 0.5);
  let brightnessFactor = map(mouseX, 0, width, 0.2, 1);

  for (let t of triangles) {
    let adjustedColor = t.color.map((c, index) => {
      if (index < 3) return c * brightnessFactor;
      return c;
    });

    fill(adjustedColor);
    noStroke();
    triangle(
      (t.x1 - width / 2) * sizeFactor + width / 2,
      (t.y1 - height / 2) * sizeFactor + height / 2,
      (t.x2 - width / 2) * sizeFactor + width / 2,
      (t.y2 - height / 2) * sizeFactor + height / 2,
      (t.x3 - width / 2) * sizeFactor + width / 2,
      (t.y3 - height / 2) * sizeFactor + height / 2
    );
  }

  // 顯示當前選中的動畫
  if (activeSpriteFrames) {
    let spriteX = width / 2; // 固定 x 座標為畫布的中間
    let spriteY = 50; // 固定 y 座標為 50

    // 顯示動畫，縮小尺寸為原來的四分之一
    image(activeSpriteFrames[currentFrame], spriteX, spriteY, 50, 50); // 寬度和高度縮小為 50x50
    if (frameCount % frameRate === 0) {
      currentFrame = (currentFrame + 1) % activeSpriteFrames.length; // 更新動畫幀
    }
  }
}

function createButtonWithSprite(label, x, y, spriteCallback, url) {
  let button = createButton(label);
  button.position(x, y);
  button.size(100, 50);
  button.style('font-size', '20px');
  button.mousePressed(() => {
    spriteCallback();
    if (url) updateIframe(url);
  });
}

function createSubButton(label, x, y, url) {
  let button = createButton(label);
  button.position(x, y);
  button.size(100, 50);
  button.style('font-size', '16px');
  button.mousePressed(() => updateIframe(url));
  return button;
}

function showSubButtons() {
  // 顯示子選項按鈕
  subButtons.forEach(button => button.show());
}

function hideSubButtons() {
  // 隱藏子選項按鈕
  subButtons.forEach(button => button.hide());
}

function updateIframe(url) {
  iframe.attribute('src', url);
}



