import React from 'react';
import './BookItem.css';
const BookItem = ({ book, onSelectBook }) => {
    const { volumeInfo } = book;
    return (
        <div className="book-item" onClick={() => onSelectBook(book)}>
            <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
            <div>
                <h3>{volumeInfo.title}</h3>
                <p>{volumeInfo.authors?.join(', ')}</p>
            </div>
        </div>
    );
};

export default BookItem;
