const roundNumberDom = document.getElementById("round-number");
const go = document.getElementById("Go");
const userNameEl = document.getElementById("name");
const gameField = document.getElementById("game");

let roundNumber = 0;
const maxRoundAmount = 3;

let userName = "User";
let buttonText = "";

const cardsData = {
  1: `<div class="card-item"><img src="../public/1.png" alt="" /></div>`,
  2: `<div class="card-item"><img src="../public/2.webp" alt="" /></div>`,
  3: `<div class="card-item"><img src="../public/3.png" alt="" /></div>`,
  4: `<div class="card-item"><img src="../public/4.webp" alt="" /></div>`,
  5: `<div class="card-item"><img src="../public/5.webp" alt="" /></div>`,
};

const indexes = Object.keys(cardsData);

let dataArray = [];

init();

function init() {
  setButtonText();
  showChanges();
  addListeners();
  setGameData();

  sleep(300).then(initWithDelay);
}

function initWithDelay() {
  setUserName();
  showChanges();
}

function setUserName(name) {
  userName = prompt("Enter yor name ☺") || name || "User";
}

function setButtonText(text) {
  buttonText = text || `Go🎇 attempt ${roundNumber + 1} from ${maxRoundAmount}`;
}

function setGameData() {
  dataArray = [];

  [...gameField.children].forEach((line) => {
    shuffledIndexes = shuffle(indexes);

    dataArray.push(shuffledIndexes);

    showLineData(line, shuffledIndexes);
    deleteAnimationClasses();
  });

  console.log(dataArray);
}

function showLineData(line, dataArr) {
  const showData = dataArr.map((el) => cardsData[el]).join("\n");

  line.innerHTML = showData;
}

function showChanges() {
  userNameEl.textContent = userName;

  go.textContent = buttonText;
}

function addListeners() {
  go.addEventListener("click", goClick);
}

function goClick() {
  setGameData();
  addAnimationClasses();

  const isWon = checkIfWon();
  console.log(isWon);
  if (isWon) {
    sleep(600).then(() => {
      alert("You woooon!!! 🎈🎆🎇🎉🎊");

      setButtonText("Game Finished");

      suggestRestart();
    });
  } else {
    ++roundNumber;

    if (roundNumber === 3) {
      go.disabled = true;

      sleep(600).then(() => {
        setButtonText("Game Finished");
        alert("You loser 🎃");

        sleep(200).then(suggestRestart);
      });
    } else setButtonText();
  }
  showChanges();
}

function checkIfWon() {
  for (let i = 0; i < 3; i++) {
    if (dataArray[0][i] === dataArray[1][i] && dataArray[0][i] === dataArray[2][i]) {
      return true;
    }
  }
  return false;
}

function suggestRestart() {
  const isRestart = confirm("Do you want to restart game?");

  if (isRestart) {
    roundNumber = 0;

    go.disabled = false;

    setButtonText();
    showChanges();
  }
}

function shuffle(array) {
  const initArrCopy = [...array];

  const copy = [];
  let n = initArrCopy.length,
    i;

  while (n) {
    i = Math.floor(Math.random() * initArrCopy.length);

    if (i in initArrCopy) {
      copy.push(initArrCopy[i]);
      delete initArrCopy[i];
      n--;
    }
  }

  return copy;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function deleteAnimationClasses() {
  sleep(600).then(() => {
    [...gameField.children].forEach((el, i) => {
      el.classList.remove(`line_${i + 1}`);
    });
  });
}

function addAnimationClasses() {
  [...gameField.children].forEach((el, i) => {
    el.classList.add(`line_${i + 1}`);
  });

  deleteAnimationClasses();
}
