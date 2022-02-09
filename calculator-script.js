/* 
  SELECTION_GRP 
*/
const inputBill = document.querySelector('#input-bill');
const inputPeople = document.querySelector('#input-people');
const tipButtons = document.querySelectorAll('.btn-tip');
const customTipButton = document.querySelector('[data-tip-custom]');
const resetButton = document.querySelector('#reset-btn');
const errorMessage = document.querySelector('#error');
const errorMessageParent = document.querySelector('#people .input-container');
const singleTip = document.querySelector('.tip-per-person');
const finalBillAndTip = document.querySelector('.total-per-person');

/* 
  INICIAL_VALUES_GRP 
*/
let billValue = 0.0;
let tipValue = 0.15; // selected button
let peopleValue = 1;

/* 
  FUNCTIONS_GRP 
*/

function getBillValue() {
  if (inputBill.value.includes(',')) {
    inputBill.value = inputBill.value.replace(',', '.');
  }

  // update bill value
  billValue = parseFloat(inputBill.value);

  // add color to reset btn
  resetButton.classList.add('action-active');

  calculateTipAndTotalPerPerson();
}

function getTipValue(value) {
  // active class
  tipButtons.forEach(btn => {
    // remove from previous btn
    btn.classList.remove('btn-active');
    // add to selected btn
    if (value.target.innerHTML === btn.innerHTML) {
      btn.classList.add('btn-active');
    }
  });

  // clear custom tip
  customTipButton.value = '';

  // update tip value
  const selectedTip = value.target.dataset.tipValue;
  tipValue = parseFloat(selectedTip);

  calculateTipAndTotalPerPerson();
}

function getCustomTipValue() {
  tipValue = parseFloat(customTipButton.value / 100);

  if (customTipButton.value !== '') {
    calculateTipAndTotalPerPerson();
  }
}

function getNumberOfPeople() {
  peopleValue = parseFloat(inputPeople.value);

  if (peopleValue <= 0) {
    errorMessage.classList.add('error-message');
    errorMessageParent.classList.add('error-parent-border');
    setTimeout(() => {
      errorMessage.classList.remove('error-message');
      errorMessageParent.classList.remove('error-parent-border');
    }, 3000);
    return;
  }

  calculateTipAndTotalPerPerson();
}

function calculateTipAndTotalPerPerson() {
  if (peopleValue >= 1) {
    const tipByPerson = (billValue * tipValue) / peopleValue;
    const totalBillAndTipByPerson = billValue / peopleValue + tipByPerson;

    singleTip.textContent = `$${tipByPerson.toFixed(2)}`;
    finalBillAndTip.textContent = `$${totalBillAndTipByPerson.toFixed(2)}`;
  }
}

function resetCalculator() {
  billValue = 0.0;
  peopleValue = 1;

  inputBill.value = '';
  inputPeople.value = '';

  singleTip.textContent = `$0.00`;
  finalBillAndTip.textContent = `$0.00`;

  resetButton.classList.remove('action-active');
}

/* 
  EVENTS_GRP 
*/
inputBill.addEventListener('input', getBillValue);
inputPeople.addEventListener('input', getNumberOfPeople);
tipButtons.forEach(btn => btn.addEventListener('click', getTipValue));
customTipButton.addEventListener('input', getCustomTipValue);
customTipButton.addEventListener('click', () => {
  tipButtons.forEach(btn => {
    btn.classList.remove('btn-active');
  });
});
resetButton.addEventListener('click', resetCalculator);
