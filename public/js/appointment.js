document.addEventListener("DOMContentLoaded", function () {
  const proceedToPayButton = document.getElementById("proceedToPay");
  const finalProceedToPayButton = document.getElementById("finalProceedToPay");
  const initialFields = document.getElementById("initialFields");
  const patientFields = document.getElementById("patientFields");
  const appointmentForm = document.getElementById("appointmentForm");

  // Show patient details form and hide initial fields on "Proceed to Pay" click
  proceedToPayButton.addEventListener("click", function () {
      initialFields.style.display = "none";  // Hide initial form fields
      patientFields.style.display = "block"; // Show patient details fields
  });

});
