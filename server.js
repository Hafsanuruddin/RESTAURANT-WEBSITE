const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing
const User = require('./models/user'); // Define the User model
const Table = require('./models/table');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the "public" directory
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/restaurant_webiste', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a route to serve the registration form
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Define a route to handle registration form submissions
app.post('/register', async (req, res) => {
    try {
        // Extract user input from the form
        const { username, password, email } = req.body;

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document and save it to the database
        const newUser = new User({
            username,
            password: hashedPassword, // Store the hashed password
            email,
        });
        await newUser.save();

        // Redirect to a success page or login page
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during registration.');
    }
});

// Define a route to serve the login form
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Define a route to handle login form submissions
app.post('/login', async (req, res) => {
    try {
        // Extract user input from the login form
        const { username, password } = req.body;

        // Find the user by username in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(401).send('Authentication failed: User not found.');
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Redirect to the booking.html page after a successful login
            res.redirect('./Booking.html');
        } else {
            return res.status(401).send('Authentication failed: Incorrect password.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Login failed: An error occurred.');
    }
});

// Define a route to serve the booking form
app.get('/Booking.html', (req, res) => {
    res.sendFile(__dirname + '/Booking.html');
});

// Handle table booking
app.post('/book-table', async (req, res) => {
    try {
        const { tableNumber, date, time } = req.body;

        // Check if the selected table is available for the given date and time
        const table = await Table.findOne({ tableNumber, date, isBooked: false });

        if (table) {
            // Mark the table as booked
            table.isBooked = true;
            await table.save();

            // Return a success message
            res.status(200).json({ message: 'Table booked successfully' });
        } else {
            // The table is already booked for the selected date and time
            res.status(400).json({ error: 'Table is not available' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during booking' });
    }
});

// Check table availability
app.get('/check-availability', async (req, res) => {
    try {
        // Query the database for available tables
        const availableTables = await Table.find({ isBooked: false });

        // Return a list of available tables
        res.status(200).json(availableTables);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking availability' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
