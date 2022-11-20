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

function resetData() {
  roundNumber = 0;

  userData["name"] = "User";
  userData["all-points"] = 0;
  userData["round-points"] = 0;

  botData["name"] = "Bot";
  botData["all-points"] = 0;
  botData["round-points"] = 0;
}

function setShowData() {
  userShowData["name"] = userData["name"];
  userShowData["all-points"] = `All points: ${userData["all-points"]}`;
  userShowData["round-points"] = `Round points:  ${userData["round-points"]}`;

  botShowData["name"] = botData["name"];
  botShowData["all-points"] = `All points: ${botData["all-points"]}`;
  botShowData["round-points"] = `Round points:  ${botData["round-points"]}`;

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
    userObj[userkey].textContent = userShowData[userkey];
  });

  Object.keys(botShowData).forEach((botkey) => {
    botObj[botkey].textContent = botShowData[botkey];
  });
}

function showChanges() {
  setShowData();
  showData();
}

function addListeners() {
  fight.addEventListener("click", fightClick);
}

function fightClick() {
  userData["round-points"] = getRandomInt(1, 10);
  botData["round-points"] = getRandomInt(1, 10);

  const isDraw = userData["round-points"] === botData["round-points"];
  if (!isDraw) {
    const isUserWin = userData["round-points"] > botData["round-points"];

    if (isUserWin) userData["all-points"]++;
    else botData["all-points"]++;
  }

  if (userData["all-points"] === 3 || botData["all-points"] === 3) {
    showChanges();

    setTimeout(() => {
      alert(userData["all-points"] === 3 ? userData["name"] + " won" : botData["name"] + " won");
    }, 1);

    fight.disabled = true;
    doRestart();
  } else {
    ++roundNumber;
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
      resetData();

      showChanges();
      fight.disabled = false;
    }
  }, 500);
}
