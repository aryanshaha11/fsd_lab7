
// frontend/src/components/BookList.js
import React from 'react';
import axios from 'axios';

const BookList = ({ books, fetchBooks, onEdit }) => {
  // Function to delete a book by ISBN
  const deleteBook = async (isbn) => {
    try {
      await axios.delete(`http://localhost:5001/api/books/${isbn}`);
      fetchBooks();  // Refresh the list after deleting a book
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>ISBN No</th>
          <th>Title</th>
          <th>Author Name</th>
          <th>Publisher Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.isbn}>
            <td>{book.bookName}</td>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>
              <button onClick={() => deleteBook(book.isbn)}>Delete</button>
              {/* Edit button */}
              <button onClick={() => onEdit(book)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
