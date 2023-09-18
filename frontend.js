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

// popup login javscript on booking table
document.addEventListener("DOMContentLoaded", function () {
    // Your existing code for the slideshow here...

    // Define the "Book a Table" link element
    const bookTableLink = document.getElementById("book-table-link");

    // Function to display the login/register popup
    function displayPopup() {
        // Create and style the popup element (you can customize this)
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
            <!-- Popup content goes here, e.g., login and register forms -->
            <h2>Login or Register</h2>
            <!-- Add your login and register forms here -->
        `;

        // Append the popup to the body
        document.body.appendChild(popup);

        // Prevent the default behavior of the link
        bookTableLink.addEventListener("click", function (e) {
            e.preventDefault();
        });

        // You can add event listeners to close the popup when necessary
        // For example, when the user successfully logs in or registers

        // Example: Close the popup when the user clicks outside of it
        window.addEventListener("click", function (e) {
            if (e.target === popup) {
                document.body.removeChild(popup);
            }
        });
    }

    // Add a click event listener to the "Book a Table" link
    bookTableLink.addEventListener("click", displayPopup);
});



