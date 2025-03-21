// Get references to the elements
const birthdateInput = document.getElementById('birthdate');
const saveDateButton = document.getElementById('saveDate');
const ageLabel = document.getElementById('ageLabel');
const resetButton = document.getElementById('resetButton');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registered successfully'))
    .catch((error) => console.error('Service Worker registration failed:', error));
}

// Save birth date to localStorage
saveDateButton.addEventListener('click', () => {
  const birthdate = birthdateInput.value;
  if (birthdate) {
    localStorage.setItem('birthdate', birthdate);
    calculateAndDisplayAge(birthdate);
    hideInputFields();  // Hide input and button after saving
  } else {
    alert('Please enter a valid birth date.');
  }
});

resetButton.addEventListener('click', () => {
  localStorage.removeItem('birthdate'); // Clear saved birthdate
  birthdateInput.style.display = 'block'; // Show the date input field
  saveDateButton.style.display = 'block'; // Show the save button
  birthdateLabel.style.display = 'block'; // Hide the label
  ageLabel.textContent = 'Your age will appear here'; // Reset age label
});

function hideInputFields() {
  const birthdateLabel = document.querySelector('label[for="birthdate"]');
  birthdateInput.style.display = 'none';
  saveDateButton.style.display = 'none';
  birthdateLabel.style.display = 'none'; // Hide the label
}

// Calculate and display age
function calculateAndDisplayAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!isBirthdayPassed) {
    age -= 1;
  }
  ageLabel.textContent = `You are ${age} years old...`;
}

// On page load, check if birthdate exists
window.onload = () => {
  const savedBirthdate = localStorage.getItem('birthdate');
  if (savedBirthdate) {
    calculateAndDisplayAge(savedBirthdate);
    hideInputFields(); // Hide input fields if birthdate exists
  }
};
