document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);

    try {
        const response = await fetch('/book-table', {
            method: 'POST',
            body: formData,
        });

        if (response.status === 200) {
            // Booking successful, display a success message
            alert('Table booked successfully.');
            form.reset(); // Clear the form
        } else {
            // Booking failed, display an error message
            alert('Booking failed. Please try again.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later.');
    }
});


// JavaScript to check table availability and update messages
const bookingForm = document.getElementById('booking-form');
const errorMessage = document.getElementById('error-message');
const nextAvailableSlots = document.getElementById('next-available-slots');

bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get user input for date and time (modify this to match your form fields)
    const dateInput = document.querySelector('input[type="date"]');
    const timeInput = document.querySelector('input[type="time"]');
    
    const date = dateInput.value;
    const time = timeInput.value;

    // Send a request to check table availability
    const response = await fetch(`/check-availability?date=${date}&time=${time}`);
    const data = await response.json();

    if (data.error) {
        errorMessage.textContent = data.error;
        nextAvailableSlots.textContent = data.nextAvailableSlots;
    } else {
        // Table is available, proceed with booking
        errorMessage.textContent = '';
        nextAvailableSlots.textContent = '';
        bookingForm.submit(); // Submit the form for booking
    }
});

const currentDate = new Date();
const selectedDate = new Date(date);
const selectedTime = new Date(`1970-01-01T${time}:00`);

if (selectedDate < currentDate || selectedTime < openingTime || selectedTime > closingTime) {
    errorMessage.textContent = 'Invalid date or time selected.';
    return;
}
