import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the CSS file

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: ''
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateData();

    if (isValid) {
      try {
        const { data } = await axios.post('http://localhost:3001/SignUp', user, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (data.message === 'success') {
          setUser({
            name: '',
            email: '',
            password: '',
            age: '',
            gender: ''
          });

          toast('YOUR ACCOUNT HAS BEEN CREATED SUCCESSFULLY!! We have sent a confirmation link to your email.');
          navigate('/SignIn');
        }
      } catch (error) {
        console.error("There was an error!", error.message || error);
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  const validateData = async () => {
    const registerSchema = object({
      name: string().min(5).max(20).required(),
      email: string().email("Please enter a valid email").required(),
      password: string().min(6).max(20).required("Please make your password more than 6 characters"),
      age: string().required("Please enter your age"),
      gender: string().oneOf(["male", "female", "other"]).required("Please select your gender")
    });

    try {
      await registerSchema.validate(user, { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      console.log("Validation error", error.errors);
      error.errors.forEach(errorMessage => {
        toast.error(errorMessage);
      });
      setErrors(error.errors);
      return false;
    }
  };

  return (
    <div className="register-body">
      <div className='main-body'>
        <div className="register-container"> {/* Apply the container class */}
          <h2 className="register-title">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-label" htmlFor="name">User Name</label>
            <input className="register-input" type="text" id="name" value={user.name} name="name" onChange={handleChange} />

            <label className="register-label" htmlFor="email">Email</label>
            <input className="register-input" type="email" id="email" value={user.email} name="email" onChange={handleChange} />

            <label className="register-label" htmlFor="password">Password</label>
            <input className="register-input" type="password" id="password" value={user.password} name="password" onChange={handleChange} />

            <label className="register-label" htmlFor="age">Age</label>
            <input className="register-input" type="number" id="age" value={user.age} name="age" onChange={handleChange} />

            <label className="register-label" htmlFor="gender">Gender</label>
            <select className="register-input" id="gender" value={user.gender} name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button className="register-button" type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
