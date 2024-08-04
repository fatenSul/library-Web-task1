import React from 'react';
import BookItem from './BookItem';
import './BookList.css';
const BookList = ({ books, onSelectBook }) => {
    return (
        <div className="book-list">
            {books.map((book) => (
                <BookItem key={book.id} book={book} onSelectBook={onSelectBook} />
            ))}
        </div>
    );
};

export default BookList;
