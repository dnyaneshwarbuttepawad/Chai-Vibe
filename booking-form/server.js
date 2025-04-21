const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your actual connection string
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/restaurantDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  person: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Save booking
app.post('/api/book', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send({ message: 'Booking saved successfully!' });
});

// Cancel booking (optional)
app.delete('/api/cancel', async (req, res) => {
  const { email, date, time } = req.body;
  const result = await Booking.findOneAndDelete({ email, date, time });
  if (result) {
    res.send({ message: 'Booking cancelled successfully.' });
  } else {
    res.send({ message: 'No booking found to cancel.' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
