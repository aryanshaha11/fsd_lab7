// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book
router.post('/', async (req, res) => {
    const { bookName, isbn, title, author, publisher } = req.body;
    try {
        const newBook = new Book({ bookName, isbn, title, author, publisher });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: 'Error adding book', error });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

// Get book by ISBN
router.get('/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
});

// Update book details by ISBN
router.put('/:isbn', async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error });
    }
});

// Delete book by ISBN
router.delete('/:isbn', async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ isbn: req.params.isbn });
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;
