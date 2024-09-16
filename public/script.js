// Get modal elements
const modal = document.getElementById('appointment-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeBtn = document.querySelector('.close-btn');
const submitForm1=document.querySelector('.submitForm');

// Open the modal when the plus button is clicked
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
let currentStep = 0; // Track current step
const steps = document.querySelectorAll(".step"); // Get all steps

// Initialize first step as active
steps[currentStep].classList.add('active');

// Function to show the next step
function nextStep() {
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove('active'); // Hide current step
    currentStep++;
    steps[currentStep].classList.add('active'); // Show next step
  }
}

// Function to show the previous step
function previousStep() {
  if (currentStep > 0) {
    steps[currentStep].classList.remove('active'); // Hide current step
    currentStep--;
    steps[currentStep].classList.add('active'); // Show previous step
  }
}

// Function to handle form submission
function submitForm(event) {
  const formData = {
    hospital: document.getElementById("hospital").value,
    department: document.getElementById("department").value,
    doctor: document.getElementById("doctor").value,
    date: document.getElementById("appointment-date").value,
    name:document.getElementById("patientname").value,
    email:document.getElementById("email").value,
    number:document.getElementById("mobileno").value,
    age:document.getElementById("Age").value,
    gender:document.getElementById("Gender").value,
  };
  console.log(formData);
  
  // Send data to backend using fetch
  fetch("https://projectsravswastha.onrender.com/hospital", { // Use the correct backend URL
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Success:", data);
    //alert("Form submitted successfully!");
    // Perform the redirection using the URL provided in the response
    if (data.redirectUrl) {
        window.location.href = data.redirectUrl; // This will redirect the user to the /hospital route
      }
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    //alert("There was an error submitting the form. " + error.message);
  });

}



document.addEventListener("DOMContentLoaded", function () {
    const proceedToPayButton = document.getElementById("proceedToPay");
    const finalProceedToPayButton = document.getElementById("finalProceedToPay").addEventListener('click', submitForm);
    const initialFields = document.getElementById("initialFields");
    const patientFields = document.getElementById("patientFields");
    const appointmentForm = document.getElementById("appointmentForm");

});
