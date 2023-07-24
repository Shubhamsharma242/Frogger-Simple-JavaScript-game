const resultDisplay = document.getElementById("result");
const timeLeftDisplay = document.querySelector("#time-left");
const startPauseBotton = document.querySelector("#start-pause");
const squares = document.querySelectorAll(".grid div");
let currentIndex = 76;
const width = 9;
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carLeft = document.querySelectorAll(".car-left");
const carRight = document.querySelectorAll(".car-right");
let timerId;
let outerTimerId;
let currentTimer = 20;
function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) {
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) {
        currentIndex += 1;
      }
      break;
    case "ArrowUp":
      if (currentIndex >= width) {
        currentIndex -= width;
      }
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) {
        currentIndex += width;
      }
      break;
  }
  // console.log(currentIndex);
  squares[currentIndex].classList.add("frog");
}
document.addEventListener("keyup", moveFrog);

function autoMoveElements() {
  currentTimer--;
  timeLeftDisplay.textContent = currentTimer;
  logsLeft.forEach((logleft) => moveLogLeft(logleft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carLeft.forEach((carleft) => moveCarLeft(carleft));
  carRight.forEach((carright) => moveCarRight(carright));
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}
function moveCarLeft(carleft) {
  switch (true) {
    case carleft.classList.contains("c1"):
      carleft.classList.remove("c1");
      carleft.classList.add("c2");
      break;

    case carleft.classList.contains("c2"):
      carleft.classList.remove("c2");
      carleft.classList.add("c3");
      break;

    case carleft.classList.contains("c3"):
      carleft.classList.remove("c3");
      carleft.classList.add("c1");
      break;
  }
}
function moveCarRight(carright) {
  switch (true) {
    case carright.classList.contains("c1"):
      carright.classList.remove("c1");
      carright.classList.add("c3");
      break;

    case carright.classList.contains("c2"):
      carright.classList.remove("c2");
      carright.classList.add("c1");
      break;

    case carright.classList.contains("c3"):
      carright.classList.remove("c3");
      carright.classList.add("c2");
      break;
  }
}

function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTimer <= 0
  ) {
    resultDisplay.textContent = "You Lose";
    clearInterval(timerId);
    clearInterval(outerTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}
function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Win! Hurrey";
    clearInterval(timerId);
    clearInterval(outerTimerId);
    // squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}

function checkOutComes() {
  lose();
  win();
}

startPauseBotton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    clearInterval(outerTimerId);
    outerTimerId = null;
    timerId = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    console.log("inside else");
    timerId = setInterval(autoMoveElements, 1000);
    document.addEventListener("keyup", moveFrog);
    outerTimerId = setInterval(checkOutComes, 50);
  }
});
