const inputVariant = document.getElementById("variant_numb");
const getSquareBtn = document.getElementById("get_square");
const squareOutput = document.getElementById("square");

getSquareBtn.addEventListener("click", () => {
    const variant = inputVariant.value;
    squareOutput.textContent = Math.PI * (variant * 2) ** 2 * (variant + 4);
});
