// Initialize basket position
let basketX = 160;

// Initialize game variables
let score = 0;
let timeLeft = 30;
let timerInterval;

// Move basket with arrow keys
document.addEventListener("keydown", function(event) {
  const speed = 10;

  switch (event.key) {
    case "ArrowLeft":
      basketX -= speed;
      break;
    case "ArrowRight":
      basketX += speed;
      break;
  }

  // Restrict basket within the game container
  const gameContainer = document.getElementById("game-container");
  const basket = document.getElementById("basket");
  const containerWidth = gameContainer.offsetWidth;
  const basketWidth = basket.offsetWidth;

  basketX = Math.max(basketX, 0);
  basketX = Math.min(basketX, containerWidth - basketWidth);

  // Update basket position
  basket.style.left = basketX + "px";
});

// Generate random box position and color
function generateBox() {
  const containerWidth = 400;
  const box = document.getElementById("box");
  const colors = ["green", "red"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const boxX = Math.floor(Math.random() * (containerWidth - 30));

  box.className = randomColor;
  box.style.top = "0";
  box.style.left = boxX + "px";
}

// Move the box downwards
function moveBox() {
  const box = document.getElementById("box");
  const boxY = box.offsetTop + 10;

  // Check if the box is outside the game container
  const gameContainer = document.getElementById("game-container");
  const containerHeight = gameContainer.offsetHeight;
  const boxHeight = box.offsetHeight;

  if (boxY > containerHeight - boxHeight) {
    // Box missed!
    if (box.classList.contains("green")) {
      score -= 10;
    } else if (box.classList.contains("red")) {
      score += 10;
    }

    updateScore();

    generateBox();
  } else {
    // Update box position
    box.style.top = boxY + "px";
  }
}

// Update score display
function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = "Score: " + score;
}

// Update timer display
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = "Time: " + timeLeft;

  if (timeLeft === 0) {
    clearInterval(timerInterval);
    endGame();
  }

  timeLeft--;
}

// Check if basket catches the box
function checkCollision() {
  const basket = document.getElementById("basket");
  const box = document.getElementById("box");

  const basketRect = basket.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();

  if (
    basketRect.top < boxRect.bottom &&
    basketRect.bottom > boxRect.top &&
    basketRect.left < boxRect.right &&
    basketRect.right > boxRect.left
  ) {
    // Box caught!
    if (box.classList.contains("green")) {
      score += 10;
    } else if (box.classList.contains("red")) {
      score -= 10;
    }

    updateScore();

    generateBox();
  }
}

// End the game and display final score
function endGame() {
  alert("Time's up! Final Score: " + score);
  score = 0;
  timeLeft = 30;
  updateScore();
}

// Check collision on box movement
setInterval(checkCollision, 100);

// Generate initial box position
generateBox();

// Start the timer
timerInterval = setInterval(updateTimer, 1000);