const inputVariant = document.getElementById("variant_numb");
const getSquareBtn = document.getElementById("get_square");
const squareOutput = document.getElementById("square");

getSquareBtn.addEventListener("click", () => {
    const variant = Number(inputVariant.value);
    squareOutput.textContent = Math.PI * (variant + 4) * variant ** 2;
});
