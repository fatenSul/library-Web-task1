import React from 'react';
import './BookDetail.css'
const BookDetail = ({ book }) => {
    if (!book) return <div>..</div>;

    const { volumeInfo } = book;
    return (
        <div className="book-detail">
            <h2>{volumeInfo.title}</h2>
            <img src={volumeInfo.imageLinks?.thumbnail} alt={volumeInfo.title} />
            <p><strong>Authors:</strong> {volumeInfo.authors?.join(', ')}</p>
            <p><strong>Published Date:</strong> {volumeInfo.publishedDate}</p>
            <p>{volumeInfo.description}</p>
        </div>
    );
};

export default BookDetail;
