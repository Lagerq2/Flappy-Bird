let gameStarted = false;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;

let player = {
    x: 50,
    y: 250,
    size: 30,
    velocity: 0,
    gravity: 0.5,
    jump: -8
};

//obsticeles
let pipes = [];
let pipeWidth = 60;
let gap = 150;
let frame = 0;
let gameOver = false;

function startGame() {

    if (!gameStarted) {
        gameStarted = true;
    }
    player.velocity = player.jump;
}

//jump with space
document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        startGame();
    }
});

//Jump with touch on phone
document.addEventListener("touchstart", function(e) {
    e.preventDefault();
    startGame();
});

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x,  player.y, player.size, player.size);
}

function drawPipes() {

    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + gap, pipeWidth, canvas.height);
    });
}

function updatePipes() {

    if (frame % 90 === 0) {
        let topHeight = Math.random() * 300 + 50;
        pipes.push({
            x: canvas.width,
            top: topHeight,
            passed: false
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        if (!pipe.passed && pipe.x + pipeWidth < player.x) {
            score++;
            pipe.passed = true;
        }
    });
}

function checkCollision() {

    for (let pipe of pipes) {
        if (
            player.x < pipe.x + pipeWidth &&
            player.x + player.size > pipe.x &&
            (player.y < pipe.top || 
                player.y + player.size > pipe.top + gap)
            ) {
                gameOver = true;
            }
        }

        if (player.y + player.size > canvas.height || player.y < 0) {
            gameOver = true;
        }
}


function update() {

    if (gameOver) {

        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", 100, 300);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameStarted) {

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Press Space or Tap to Start", 20, 300);
    }

    if (gameStarted) {

        player.velocity += player.gravity;
        player.y += player.velocity;
        updatePipes();
        checkCollision();
    }

    drawPlayer();
    drawPipes();

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 40);
    
    frame++;
    requestAnimationFrame(update);
}
update();