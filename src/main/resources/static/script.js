let gameStarted = false;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let hasAskedForName = false;
let hasShownButton = false;

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
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        startGame();
    }
});

//Jump with touch on phones
document.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startGame();
}, {passive: false});

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawPipes() {

    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + gap, pipeWidth, canvas.height);
    });
}

let pipeTimer = 0;

function updatePipes(deltaTime) {

    pipeTimer += deltaTime;

    if (pipeTimer > 90) {
        pipeTimer = 0;

        let topHeight = Math.random() * 300 + 50;
        pipes.push({
            x: canvas.width,
            top: topHeight,
            passed: false
        })
    }


    pipes.forEach(pipe => {
        pipe.x -= 2 * deltaTime;

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

function getHigScores() {
    fetch("/api/scores")
        .then(response => response.json())
        .then(highscores => {
            console.log("All highscores:", highscores);
        })
        .catch(error => console.error("Error fetching highscores:", error));
}

document.getElementById("playAgainBtn").addEventListener("click", function () {
    document.getElementById("playAgainBtn").style.display = "none";
    location.reload();


});

document.getElementById("playAgainBtn").addEventListener("touchstart", function (e) {
    e.preventDefault();
    document.getElementById("playAgainBtn").style.display = "none";
    location.reload();


})

let lastTime = 0;

function update(time) {

    if (gameOver) {
        const screen = document.getElementById("gameOverScreen");
        screen.style.display = "block";
        canvas.style.display = "none";

        if (!hasAskedForName) {
            hasAskedForName = true;
            let name = prompt("Enter your name:");

            fetch("/api/scores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: name, score: score})
            })
                .then(response => response.json())
                .then(data => {
                    showLeaderboard();
                })
                .catch(error => console.error("Error saving highscore:", error));


        }
        return;
    }

    let deltaTime = (time - lastTime) / 16.67;
    lastTime = time;

    if (deltaTime > 2) {

        deltaTime = 1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameStarted) {

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Press Space or Tap to Start", 20, 300);
    }

    if (gameStarted) {

        player.velocity += player.gravity * deltaTime;
        player.y += player.velocity * deltaTime;
        updatePipes(deltaTime);
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

function showLeaderboard() {
    fetch("/api/scores")
        .then(res => res.json())
        .then(highscores => {
            // Sortera top scores
            highscores.sort((a, b) => b.score - a.score);

            const leaderboard = document.getElementById("leaderboard");
            leaderboard.innerHTML = ""; // töm gamla

            highscores.slice(0, 10).forEach(hs => {
                const li = document.createElement("li");
                li.textContent = `${hs.name}: ${hs.score}`;
                leaderboard.appendChild(li);
            })
        })
        .catch(err => console.error("Error fetching highscores:", err));
}

update();