const form = document.getElementById("form");
const title = document.getElementById("title");

init();

function init() {
  title.textContent = "Input Text and Word and receive amount of times that word is into text";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { word, text } = form;

    const textWithoutPunctuation = text.value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    const amountOfWordInText = textWithoutPunctuation.split(" ").filter((textWord) => textWord.toLowerCase() === word.value.toLowerCase()).length;

    title.textContent = amountOfWordInText ? `Word '${word.value}' is ${amountOfWordInText} times into text` : `Word '${word.value}' didn't exist into text 🤷‍♂️`;
  });
}
