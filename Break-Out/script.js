const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

const difficulty = document.getElementById('difficulty');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('btn-start');

let score = 0;
let lives = 3;

// set difficulty to value in local storage or medium
let level = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

// set difficulty select value
difficulty.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

/*
let brickRowCount = 9;
let brickColumnCount = 5;
*/


const brickRowCount = 9;
let brickColumnCount = 5;


let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, speed: 4, dx: 4, dy: -4
}





//Create ball props


// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80, h: 10, speed: 8, dx: 0
}

const brickInfo = {
  w: 70, h: 20, padding: 10, offsetX: 45, offsetY: 60, visible: true
}


// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };

  }
}



// draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}
// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

//Draw bricks on canvas
function drawBricks() {

  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  })
}


// Move Paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;


  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}


function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;




  // Wall collision (x)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  // Wall colliosion (y)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision
  if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
    ball.dy = -ball.speed;
  }


  // bricks collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (ball.x - ball.size > brick.x &&/*left brick side check */ ball.x + ball.size < brick.x + brick.w && /*right brick side check*/ ball.y + ball.size > brick.y && /*top brick side check*/ ball.y - ball.size < brick.y + brick.h) /*bottom brick side check*/ {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - lose
  if (ball.y + ball.size > canvas.height) {
    // showAllBricks();

    if (lives > 1) {
      lives--;

    }
    else {
      score = 0;
      lives = 3;
      showAllBricks();
    }

  }
}

// increase score
function increaseScore() {
  score++;

  if (score % (brickRowCount * brickColumnCount) === 0) {


    showAllBricks();
    score = 0;


  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}
// draw everything
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveBall();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawBricks();

}


function update() {
  movePaddle();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}



//Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

//Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Draw Score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);

}

function drawLives() {
  ctx.font = '20px Arial';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 770, 30);
}

draw();

//Rules  and close event handlers
rulesBtn.addEventListener('click', () =>
  rules.classList.add('show')
);

closeBtn.addEventListener('click', () => rules.classList.remove('show'));

difficulty.addEventListener('change', e => {
  level = e.target.value;
  localStorage.setItem('difficulty', level);


  if (level === 'medium') {
    ball.speed = 6;
    ball.dx = 6;
    ball.dy = -6;
    brickColumnCount = 7;
  } else if (level === 'hard') {
    ball.speed = 8;
    ball.dx = 8;
    ball.dy = -8;
    brickColumnCount = 9;
  } else {
    ball.speed = 4;
    ball.dx = 4;
    ball.dy = -4;
    brickColumnCount = 5;
  }



});

startBtn.addEventListener('click', e => {
  startBtn.classList.add('show');
  update();
});
