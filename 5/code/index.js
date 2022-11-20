const form = document.getElementById("form");
const resetArr = document.getElementById("resetArr");
const h1 = document.getElementById("h1");

let isItiated = false;
let array = [];

init();

function init() {
  h1.textContent = "Guess the number";
  array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 + 1));
  console.log(array);

  if (!isItiated) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const isNumberInArr = array.includes(Number(form.number.value));
      h1.textContent = isNumberInArr ? "Yoooo, you win 🎉🎊✨" : "You didn't guess haha 👺";
    });
    resetArr.addEventListener("click", () => init());
  }
  isItiated = true;
}
