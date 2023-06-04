$(document).ready(function() {
  var gameArea = $("#gameArea");
  var scoreValue = $("#scoreValue");
  var timerValue = $("#timerValue");
  var startBtn = $("#startBtn");
  var score = 0;
  var timer = 30;
  var gameInterval;
  var timerInterval;
  var boxImages = [
    { src: "../Images/banana.png", type: "banana" },
    { src: "../Images/apple.jpg", type: "apple" },
    { src: "../Images/hamburger.jpg", type: "hamburger" }
  ];

  startBtn.click(startGame);

  function startGame() {
    resetGame();
    startBtn.prop("disabled", true);
    startBtn.text("Game in Progress");
    gameInterval = setInterval(createBox, 1000);
    timerInterval = setInterval(updateTimer, 1000);
    gameArea.on("click", ".box", catchBox);
  }

  function resetGame() {
    gameArea.empty();
    score = 0;
    timer = 30;
    scoreValue.text(score);
    timerValue.text(timer);
  }

  function createBox() {
    var box = $("<div>").addClass("box");
    box.css("left", Math.floor(Math.random() * (gameArea.width() - 50)) + "px");
    var randomBox = boxImages[Math.floor(Math.random() * boxImages.length)];
    box.css("background-image", "url('" + randomBox.src + "')");
    box.data("type", randomBox.type);
    gameArea.append(box);
    moveBox(box);
  }

  function moveBox(box) {
    var top = 0;
    function animateBox() {
      top += 2;
      box.css("top", top + "px");

      if (top >= gameArea.height()) {
        box.remove();
        return;
      }

      requestAnimationFrame(animateBox);
    }

    animateBox();
  }

  function catchBox() {
    var clickedBoxType = $(this).data("type");
    $(this).remove();
    if (clickedBoxType === "hamburger") {
      score--;
    } else {
      score++;
    }
    scoreValue.text(score);
  }

  function updateTimer() {
    timer--;
    timerValue.text(timer);
    if (timer === 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      gameArea.off("click", ".box", catchBox);
      startBtn.prop("disabled", false);
      startBtn.text("Restart");
    }
  }
});
