const { body } = document;
body.classList.add("bg");

const answers = ["Yes", "Possibly", "Definitely", "Of course", "Probably", "No", "Absolutely not", "Never", "No way", "May be", "Sure"];

const content = `
    <div class="container-sm wrap">
      <h1 id="title" class="text-center m-4 text-light">Ask something and Shake the sphere</h1>
      <div class="sphere-container">
        <img id="img" src="./img/sphere.png" alt="sphere" />
      </div>
      <h4 id="answer"  class="text-center  text-light display-1"></h4>
    </div>
    `;

body.insertAdjacentHTML("afterbegin", content);

const answer = document.getElementById("answer");
const img = document.getElementById("img");
const sphereContainer = document.querySelector(".sphere-container");

img.addEventListener("click", () => {
  sphereContainer.classList.add("fastShake");

  setTimeout(() => {
    answer.textContent = answers[Math.floor(Math.random() * answers.length)];
    sphereContainer.classList.remove("fastShake");
  }, 1000);
});
