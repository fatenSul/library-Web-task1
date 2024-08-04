import React, { useState } from 'react';
import Root from './Root/Root.jsx';
import SignUp from './pages/SignUp/signup.jsx';
import SignIn from './pages/SignIn/signin.jsx';
import Forgot from './pages/SignIn/forget.jsx';
import Protectrouters from './componets/protectrouters.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Navbar from './componets/Navbar.jsx';
import ContactPage from './pages/contact/contact.jsx';
import SearchBar from './pages/Home/SearchBar.jsx';
import BookList from './pages/Home/BookList';
import BookDetail from './pages/Home/BookDetail';
import axios from 'axios';
import './App.css';
export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async (query) => {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: { q: query },
    });
    setBooks(response.data.items);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/Forgot",
          element: <Forgot />
        },
        {
          path: "/SignIN",
          element: <SignIn />
        },
        // {
        //   path: "/",
        //   element: <Home />
        // },
        {
          path: "/SignUp",
          element: <SignUp />,
        },
        {
          path: "/Contact",
          element: <ContactPage />,
        },
        {
          path: "/",
          element: (
            <div>
              <SearchBar onSearch={handleSearch} />
              <BookList books={books} onSelectBook={handleSelectBook} />
              <BookDetail book={selectedBook} />
            </div>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  );
}
