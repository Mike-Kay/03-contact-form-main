const successState = document.querySelector(".success-state");
const form = document.querySelector(".form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const radInputs = [...document.querySelectorAll(".rad-input")];
const queryColumn = document.querySelector(".query-column");
const msgInput = document.querySelector(".msg-input");
const checkInput = document.querySelector(".check-input");
const srMsg = document.querySelector(".sr-msg");

checkInput.value = "off";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let successValid = inputValidation();
  if (successValid.length >= 6) {
    const msg = "Thanks for completing the form. We'll be in touch soon!";
    successIsValid();
    srState(msg);
  } else {
    const msg = "Form not submitted, please fill out all required fields";
    srState(msg);
  }

  isRadChecked = "";
  isBoxChecked = "";
});

const inputValidation = () => {
  const firstNameRow = firstName.parentElement;
  const lastNameRow = lastName.parentElement;
  const emailRow = email.parentElement;
  const msgInputRow = msgInput.parentElement;
  const checkInputRow = checkInput.parentElement;

  let successValid = [];

  // Names
  if (!firstName.value) firstNameRow.classList.add("show-error");
  else {
    firstNameRow.classList.remove("show-error");
    successValid.push(firstName.id);
  }
  if (!lastName.value) lastNameRow.classList.add("show-error");
  else {
    lastNameRow.classList.remove("show-error");
    successValid.push(lastName.id);
  }

  // Email
  if (!email.value || !validEmail(email.value))
    emailRow.classList.add("show-error");
  else {
    emailRow.classList.remove("show-error");
    successValid.push(email.id);
  }

  // Radio
  if (!isRadChecked) queryColumn.classList.add("show-error");
  else {
    queryColumn.classList.remove("show-error");
    successValid.push(isRadChecked);
  }

  // Message
  if (!msgInput.value) {
    msgInputRow.classList.add("show-error");
    msgInput.nextElementSibling.textContent = "This field is required";
  } else if (msgInput.value.length < 2) {
    msgInputRow.classList.add("show-error");
    msgInput.nextElementSibling.textContent =
      "Message cannot be less than two letters";
  } else {
    msgInputRow.classList.remove("show-error");
    successValid.push(msgInput.id);
  }

  // Checkbox
  if (!isBoxChecked) checkInputRow.classList.add("show-error");
  else {
    checkInputRow.classList.remove("show-error");
    successValid.push(isBoxChecked);
  }

  return successValid;
};

email.addEventListener("blur", () => {
  if (!validEmail(email.value)) srErrorFieldAlrt(email);
});

let isRadChecked;
radInputs.forEach((radInput) => {
  radInput.addEventListener("change", () => {
    if (radInput.checked) isRadChecked = radInput.value;
  });
  radInput.addEventListener("blur", () => {
    if (!isRadChecked) srErrorFieldAlrt(radInput);
  });
});

let isBoxChecked;
checkInput.addEventListener("change", () => {
  if (checkInput.checked) {
    isBoxChecked = true;
    checkInput.value = "on";
  } else {
    isBoxChecked = false;
    checkInput.value = "off";
  }
});
checkInput.addEventListener("blur", () => {
  if (checkInput.checked == false) {
    srErrorFieldAlrt(checkInput);
  }
});

const successIsValid = () => {
  successState.classList.add("show");
  setTimeout(() => {
    successState.classList.remove("show");
  }, 3000);
  form.reset();
};

const validEmail = (email) => {
  const regEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regEx.test(String(email).toLocaleLowerCase());
};

const inputArr = [firstName, lastName, msgInput];

const srErrorFieldAlrt = (field) => {
  let msg;
  let srError = field.nextElementSibling.nextElementSibling;
  if (field.classList.contains("fn")) msg = "first name is required";
  else if (field.classList.contains("ln")) msg = "last name is required";
  else if (field.classList.contains("em"))
    msg = "please enter a valid email address";
  else if (field.classList.contains("msg-input"))
    msg = "Message field is required, with at least two characters";
  else if (field.classList.contains("check-input")) {
    msg = "To submit this form, please consent to being contacted";
  } else msg = "please select a query type";

  srError.textContent = msg;
  srError.setAttribute("aria-live", "assertive");

  setTimeout(() => {
    srError.removeAttribute("aria-live");
    srError.textContent = "";
  }, 10);
};

inputArr.forEach((input) => {
  input.addEventListener("blur", () => {
    if (!input.value) {
      srErrorFieldAlrt(input);
    }
  });
});

const srState = (msg) => {
  srMsg.setAttribute("aria-live", "assertive");
  srMsg.textContent = msg;
  setTimeout(() => {
    srMsg.removeAttribute("aria-live", "assertive");
    srMsg.textContent = "";
  }, 10);
};
