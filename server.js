const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/libraryDB')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);

// Starting the server
const PORT = process.env.PORT || 5001; // Change to 5001 if needed
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
