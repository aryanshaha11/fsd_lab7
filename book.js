// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
