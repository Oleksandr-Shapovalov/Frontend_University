const inputVariant = document.getElementById("variant_numb");
const getSquareBtn = document.getElementById("get_square");
const squareOutput = document.getElementById("square");

alert("Variant 31, Oleksandr Shapovalov");

getSquareBtn.addEventListener("click", () => {
  const variant = Number(inputVariant.value);
  squareOutput.textContent = Math.PI * (variant + 4) * variant ** 2;
  squareOutput.insertAdjacentHTML("beforeend", ` <span>cm<sup>3</sup></span>`);
});
