import React, { useState } from 'react';
import './SearchBar.css';

// Import images
import book1 from './1.jpg';
import book2 from './2.jpg';
import book3 from '../3.jpg';
import book4 from './4.jpg'; // Additional image
import book5 from './5.jpg'; // Additional image

const quotes = [
    {
        image: book1,
        quote: '“A room without books is like a body without a soul.” — Marcus Tullius Cicero'
    },
    {
        image: book2,
        quote: '“Books are a uniquely portable magic.” — Stephen King'
    },
    {
        image: book3,
        quote: '“So many books, so little time.” — Frank Zappa'
    },
    {
        image: book4,
        quote: '“The only thing you absolutely have to know is the location of the library.” — Albert Einstein'
    },
    {
        image: book5,
        quote: '“I have always imagined that Paradise will be a kind of library.” — Jorge Luis Borges'
    }
];

const SearchBook = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    // Check if the query is empty
    const shouldShowImages = query.trim() === '';

    return (
        <div className='SBcontainer'>
            <div className="search-book">
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for books..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
                {shouldShowImages && (
                    <div className="book-quotes">
                        {quotes.map((item, index) => (
                            <div key={index} className="book-quote">
                                <img src={item.image} alt={`Book ${index + 1}`} className="book-image" />
                                <p className="quote-text">{item.quote}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBook;
