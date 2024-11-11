// frontend/src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ selectedBook, fetchBooks, clearSelectedBook }) => {
  const [formData, setFormData] = useState({
    bookName: '', isbn: '', title: '', author: '', publisher: ''
  });

  // Populate the form with the selected book data if in edit mode
  useEffect(() => {
    if (selectedBook) {
      setFormData({
        bookName: selectedBook.bookName,
        isbn: selectedBook.isbn,
        title: selectedBook.title,
        author: selectedBook.author,
        publisher: selectedBook.publisher,
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBook) {
      // Update book (PUT request)
      try {
        await axios.put(`http://localhost:5001/api/books/${formData.isbn}`, formData);
        fetchBooks(); // Refresh the list of books
        clearSelectedBook(); // Clear the form after updating
      } catch (err) {
        console.error('Error updating book:', err);
      }
    } else {
      // Add new book (POST request)
      try {
        await axios.post('http://localhost:5001/api/books', formData);
        fetchBooks();
      } catch (err) {
        console.error('Error adding book:', err);
      }
    }

    // Reset the form
    setFormData({ bookName: '', isbn: '', title: '', author: '', publisher: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="bookName"
        placeholder="Book Name"
        value={formData.bookName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN No"
        value={formData.isbn}
        onChange={handleChange}
        disabled={!!selectedBook}  // Disable ISBN input when editing
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={formData.author}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="publisher"
        placeholder="Publisher Name"
        value={formData.publisher}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {selectedBook ? 'Update Book' : 'Add Book'}
      </button>
      {selectedBook && (
        <button type="button" onClick={clearSelectedBook}>Cancel Edit</button>
      )}
    </form>
  );
};

export default BookForm;
