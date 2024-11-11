// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);  // State for editing

  // Fetch books from the backend when the component mounts
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Clear selected book for canceling edit
  const clearSelectedBook = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      {/* Form to add/update books */}
      <BookForm
        selectedBook={selectedBook}
        fetchBooks={fetchBooks}
        clearSelectedBook={clearSelectedBook}
      />
      {/* Display list of books */}
      <BookList books={books} fetchBooks={fetchBooks} onEdit={setSelectedBook} />
    </div>
  );
}

export default App;
