// listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  //Hide Results
  document.getElementById("results").style.display = "none";

  // show loader on click
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate results
function calculateResults(e) {
  console.log("calculating...");
  // UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const months = document.getElementById("months");
  const downPayment = document.getElementById("down-payment");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //Looked up formula to calculate loan info needed

  const principal = parseFloat(amount.value - downPayment.value);
  const calculatedInterest = parseFloat((interest.value) / 100 / 12);
  const calculatedPayments = parseFloat(months.value);

  // compute the monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = principal * x * calculatedInterest / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show Results
    document.getElementById("results").style.display = "block";

    // Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
  }
}

// show error
function showError(error) {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Hide loader
  document.getElementById("loading").style.display = "none";
  // create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class
  errorDiv.className = "alert alert-danger";

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
