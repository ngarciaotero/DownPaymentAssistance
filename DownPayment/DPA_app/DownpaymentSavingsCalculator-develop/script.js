const form = document.querySelector('form');
const homePriceInput = form.querySelector('input[name="homePrice"]');
const percentageInput = form.querySelector('input[name="percentage"]');
const messageContainer = document.createElement('div');

// Display Downpayment Savings Goal
function displaySavings() {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let homePrice = homePriceInput.value.replace(/,/g, '');
    let decimalRate = percentageInput.value / 100;

    if (homePrice && decimalRate) {
      let savings = homePrice * decimalRate;
      messageContainer.textContent = `Your Down Payment Savings Goal is ${savings}`;
    } else {
      messageContainer.textContent = `Please enter valid inputs for Home Price and Percentage.`;
    }
    document.body.appendChild(messageContainer);
  })
}

displaySavings();
