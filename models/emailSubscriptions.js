// Define a schema for email subscriptions
const mongoose = require('mongoose');

const emailSubscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true, // Ensure that each email is unique in the collection
    },
});

// Create a model for the email subscription collection
const EmailSubscription = mongoose.model('EmailSubscription', emailSubscriptionSchema);

module.exports = { EmailSubscription };
