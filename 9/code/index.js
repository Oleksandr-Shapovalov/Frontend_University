const user = document.getElementById("user");
const bot = document.getElementById("bot");

const roundNumberDom = document.getElementById("round-number");
const fight = document.getElementById("Fight");

let roundNumber = 0;

const userObj = {};
const botObj = {};

const userShowData = {};
const botShowData = {};

const userData = {};
const botData = {};

const cardArray = [
  { card: `<img src="../public/back.jpg" alt="back card" />`, points: 0 },
  { card: `<img src="../public/6.jpg" alt="six" />`, points: 6 },
  { card: `<img src="../public/7.jpg" alt="seven" />`, points: 7 },
  { card: `<img src="../public/8.jpg" alt="eight" />`, points: 8 },
  { card: `<img src="../public/9.jpg" alt="nine" />`, points: 9 },
  { card: `<img src="../public/10.jpg" alt="ten" />`, points: 10 },
  { card: `<img src="../public/J.jpg" alt="Jack" />`, points: 2 },
  { card: `<img src="../public/Q.jpg" alt="Quine" />`, points: 3 },
  { card: `<img src="../public/K.jpg" alt="King" />`, points: 4 },
  { card: `<img src="../public/A.jpg" alt="Ace" />`, points: 11 },
];

init();

function init() {
  resetData();
  setObjects();
  setShowData();
  addListeners();
  showChanges();
  setUserName();
}

function setObjects() {
  [...user.children].forEach((el) => {
    userObj[el.dataset.name] = el;
  });
  [...bot.children].forEach((el) => {
    botObj[el.dataset.name] = el;
  });
}

function resetData(name = "User") {
  roundNumber = 0;

  userData["name"] = name;
  userData["all-points"] = 0;
  userData["round-points"] = cardArray[0].points;
  userData["round-card"] = cardArray[0].card;

  botData["name"] = "Bot";
  botData["all-points"] = 0;
  botData["round-points"] = cardArray[0].points;
  botData["round-card"] = cardArray[0].card;
}

function setShowData() {
  userShowData["name"] = userData["name"];
  userShowData["all-points"] = `All points: ${userData["all-points"]}`;
  // userShowData["round-points"] = userData["round-points"];
  userShowData["round-card"] = userData["round-card"];

  botShowData["name"] = botData["name"];
  botShowData["all-points"] = `All points: ${botData["all-points"]}`;
  // botShowData["round-points"] = botData["round-points"];
  botShowData["round-card"] = botData["round-card"];

  roundNumberDom.textContent = `Round Number: ${roundNumber}`;
}

function setUserName() {
  setTimeout(() => {
    userData["name"] = prompt("Enter yor name ☺") || "User";
    showChanges();
  }, 0);
}

function showData() {
  Object.keys(userShowData).forEach((userkey) => {
    userObj[userkey].innerHTML = userShowData[userkey];
  });

  Object.keys(botShowData).forEach((botkey) => {
    botObj[botkey].innerHTML = botShowData[botkey];
  });
}

function showChanges() {
  setShowData();
  showData();
}

function addListeners() {
  fight.addEventListener("click", fightClick);
}

function setRandomCards() {
  const userCardNumber = getRandomInt(1, cardArray.length - 1);
  const botCardNumber = getRandomInt(1, cardArray.length - 1);

  userData["round-points"] = cardArray[userCardNumber].points;
  botData["round-points"] = cardArray[botCardNumber].points;

  userData["round-card"] = cardArray[userCardNumber].card;
  botData["round-card"] = cardArray[botCardNumber].card;
}

function fightClick() {
  setRandomCards();

  userData["all-points"] += userData["round-points"];
  botData["all-points"] += botData["round-points"];

  if (++roundNumber === 3) {
    showChanges();

    setTimeout(() => {
      if (userData["all-points"] === botData["all-points"]) alert("Draw ⚔");
      else alert(userData["all-points"] > botData["all-points"] ? userData["name"] + " won 🎉✨" : botData["name"] + " won 👺");
    }, 100);

    fight.disabled = true;
    doRestart();
  } else {
    showChanges();
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doRestart() {
  setTimeout(() => {
    const isRestart = confirm("Restart game?");
    if (isRestart) {
      resetData(userData["name"]);

      showChanges();
      fight.disabled = false;
    }
  }, 500);
}
