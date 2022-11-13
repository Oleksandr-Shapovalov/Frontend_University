const registerForm = document.getElementById("registerForm");
console.log(registerForm.elements);

registerForm.submit.addEventListener("click", sendForm);

(function init() {
  registerForm.addEventListener("input", (e) => {
    removeError(registerForm[e.target.name]);
  });
})();

function sendForm(e) {
  e.preventDefault();
  let isFormValid = true;

  for (let i = 0; i < registerForm.elements.length - 1; i++) {
    const element = registerForm.elements[i];
    if (!element.value) {
      isFormValid = false;

      addError(element);
    }
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.exec(registerForm.email.value)) {
    isFormValid = false;

    addError(registerForm.email, " Incorrect email");
  }
  if (registerForm.password.value !== registerForm["password-repeat"].value) {
    isFormValid = false;

    addError(registerForm["password-repeat"], "Password didn't match");
  }
  if (registerForm.login.value.toLowerCase() === "administrator") {
    isFormValid = false;

    addError(registerForm.login, `Incorrect login, it couldn't be equal '${registerForm.login.value}'`);
  }

  if (isFormValid) {
    alert("form sent");
    clearForm();
  } else alert("form data failure");
}

function addError(el, text = `Value shouldn't be empty`) {
  if (!document.getElementById(`${el.name}-error`) && !document.getElementById(`${el.name}-error-empty`)) {
    el.insertAdjacentHTML("afterend", `<div id="${el.name}-error" class="form-text text-danger ">${text}</div>`);
  }
}
function removeError(el) {
  const specialError = document.getElementById(`${el.name}-error`);
  const emptyError = document.getElementById(`${el.name}-error-empty`);

  if (specialError) {
    specialError.remove();
  }
  if (emptyError) {
    emptyError.remove();
  }
}

function clearForm(params) {
  for (let i = 0; i < registerForm.elements.length - 1; i++) {
    const element = registerForm.elements[i];
    element.value = "";
  }
}
