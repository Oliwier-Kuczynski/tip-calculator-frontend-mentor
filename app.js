//Primary global variables

const primaryInputAmount = document.querySelector(
  "[data-input-primary-amount]"
);
const primaryInputPeople = document.querySelector(
  "[data-input-primary-people]"
);
const secondaryInput = document.querySelector("[data-input-secondary]");

const resetBtn = document.querySelector("[data-btn-reset]");

window.onload = function () {
  primaryInputAmount.value = "";
  primaryInputPeople.value = 1;
};

let primaryInputAmountValue;
let primaryInputPeopleValue = 1;
let tipAmountValue;

//EventListners

primaryInputAmount.addEventListener("input", () => {
  primaryInputAmountValue = Number(primaryInputAmount.value);
  inputsCheck(primaryInputAmount);
});

primaryInputPeople.addEventListener("input", () => {
  primaryInputPeopleValue = Math.round(Number(primaryInputPeople.value));
  inputsCheck(primaryInputPeople);
});

secondaryInput.addEventListener("input", secondaryInputSaveValue);
secondaryInput.addEventListener("click", secondaryInputSaveValue);

//Buttons for selecting tips

const btnsTip = document.querySelectorAll("[data-btn-tip]");
let activeBtn = null;

btnsTip.forEach((btnTip) => {
  btnTip.addEventListener("click", (e) => {
    tipAmountValue = Number(btnTip.value);

    e.currentTarget.classList.add("active");

    if (activeBtn != null && activeBtn != e.currentTarget) {
      activeBtn.classList.remove("active");
    }

    activeBtn = e.currentTarget;

    secondaryInput.classList.remove("input-outline-warning");

    tipWarning.textContent = "";

    calculateTip();
    calculateTotal();
  });
});

resetBtn.addEventListener("click", resetValues);

//Variables for inputs checking (also used in btnsTip for reseting tipWarning)

const primaryInputAmountWarning = document.querySelector(
  "[data-input-primary-amount-warning]"
);
const tipWarning = document.querySelector("[data-tip-warning]");
const primaryInputPeopleWarning = document.querySelector(
  "[data-input-primary-people-warning]"
);

//Input Checking

function inputsCheck(inputName) {
  if (inputName.value == "") {
    if (inputName == primaryInputAmount) {
      //
      primaryInputAmountValue = "";
      //
      primaryInputAmountWarning.textContent = `Can't be empty !`;
    } else if (inputName == secondaryInput) {
      //
      tipAmountValue = 0;
      //
      tipWarning.textContent = `Can't be empty !`;
    } else if (inputName == primaryInputPeople) {
      //
      primaryInputPeopleValue = 1;
      //
      primaryInputPeopleWarning.textContent = `Can't be empty !`;
    }

    if (inputName == secondaryInput) {
      inputName.classList.add("input-outline-warning");
    } else {
      inputName.parentElement.classList.add("input-outline-warning");
    }

    tipAmountOutput.textContent = "NaN";
    totalAmountOutput.textContent = "NaN";
  } else if (inputName.value <= 0) {
    if (inputName == primaryInputAmount) {
      //
      primaryInputAmountValue = "";
      //
      primaryInputAmountWarning.textContent = `Can't be zero or less !`;
    } else if (inputName == secondaryInput) {
      //
      tipAmountValue = 0;
      //
      tipWarning.textContent = `Can't be zero or less !`;
    } else if (inputName == primaryInputPeople) {
      //
      primaryInputPeopleValue = 1;
      //
      primaryInputPeopleWarning.textContent = `Can't be zero or less !`;
    }

    if (inputName == secondaryInput) {
      inputName.classList.add("input-outline-warning");
    } else {
      inputName.parentElement.classList.add("input-outline-warning");
    }

    tipAmountOutput.textContent = "Error";
    totalAmountOutput.textContent = "Error";
  } else {
    if (inputName == secondaryInput) {
      inputName.classList.remove("input-outline-warning");
    } else {
      inputName.parentElement.classList.remove("input-outline-warning");
    }

    primaryInputAmountWarning.textContent = ``;
    tipWarning.textContent = ``;
    primaryInputPeopleWarning.textContent = ``;

    calculateTip();
    calculateTotal();
  }
}

//Calculations

function secondaryInputSaveValue() {
  tipAmountValue = Number(secondaryInput.value / 100);

  if (activeBtn) {
    activeBtn.classList.remove("active");
  }

  inputsCheck(secondaryInput);
}

// Variables for these two calculations
const tipAmountOutput = document.querySelector("[data-output-tip]");
const totalAmountOutput = document.querySelector("[data-output-total]");
//

function calculateTip() {
  const tipAmountOutputValue =
    (primaryInputAmountValue * tipAmountValue) / primaryInputPeopleValue;

  tipAmountOutput.textContent = tipAmountOutputValue;
}

function calculateTotal() {
  const totalAmountOutputValue =
    (primaryInputAmountValue + primaryInputAmountValue * tipAmountValue) /
    primaryInputPeopleValue;

  totalAmountOutput.textContent = totalAmountOutputValue;
}

//Reseting Primary Inputs

function resetValues() {
  primaryInputAmountValue = "";
  primaryInputAmount.value = "";

  primaryInputPeopleValue = 1;
  primaryInputPeople.value = 1;

  tipAmountOutput.textContent = "NaN";
  totalAmountOutput.textContent = "NaN";
}
