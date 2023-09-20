const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,

});

const User = mongoose.model('User', userSchema);


const bookingSchema = new mongoose.Schema({
    username: String,
    numberOfPersons: Number,
    tableNumber: Number,
    date: Date,
    time: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports= {  
    User,
    Booking,
};