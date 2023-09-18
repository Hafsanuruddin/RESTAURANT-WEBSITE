//  slideshow javascript
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        const slides = document.querySelectorAll('.slide');

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 4000); // Change slide every 5 seconds (adjust as needed)
    }
});



// Function to display the popup
function displayPopup() {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <h2>Register or Login</h2>
        <h3>New user?</h3>
        <div class="popup-content">
            <button id="register-button">Register</button>
            <h3> Already have an Account? </h3>
            <button id="login-button">Login</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Handle Register button click
    document.getElementById("register-button").addEventListener("click", function () {
        // Redirect to register.html
        window.location.href = "register.html";
    });

    // Handle Login button click
    document.getElementById("login-button").addEventListener("click", function () {
        // Redirect to login.html
        window.location.href = "login.html";
    });

    // Close the popup when clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            document.body.removeChild(popup);
        }
    });
}

// Add click event listener to the "Book a Table" link
document.getElementById("book-table-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    displayPopup(); // Display the popup
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Add login or registration logic here

    // Redirect to booking.html after successful login or registration
    window.location.href = "booking.html";
});
