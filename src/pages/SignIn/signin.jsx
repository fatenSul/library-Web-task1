import React, { useState } from 'react';
import axios from 'axios';
import { object, string } from 'yup';
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import './signin.css';

export default function Signin() {
    const history = useNavigate();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [resetEmail, setResetEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://ecommerce-node4-five.vercel.app/auth/reset-password', {
                email: resetEmail
            }); 
            if (data.message === 'success') {
                toast.success('Password reset email sent!');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const validateData = async () => {
        const LoginScheme = object({
            email: string().email().required(),
            password: string().min(6).max(20).required(),
        });
        try {
            await LoginScheme.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            setErrors(error.errors);
            error.errors.forEach(e => {
                toast.error(e)
            })
            return false;
        } finally {
            setLoader(false)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const validateDataResult = await validateData()
        if (validateDataResult === true) {
            try {
                const { data } = await axios.post(`http://localhost:3001/signin`,
                    {
                        email: user.email,
                        password: user.password
                    });

                setUser({
                    email: '',
                    password: '',
                });

                if (data.message === 'success') {
                    toast.success("You are logged in successfully!")
                    localStorage.setItem('userToken', data.token)
                    history("/Profile", {state:{id:user.email}})
                    // localStorage.removeItem('userToken')
                    navigate('/')
                }

                console.log(data); // Check the response from the server
            } catch (error) {
                toast.error(error.response.data.message)
            } finally {
                setLoader(false)
            }
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-card">
                <h1>Welcome Back!</h1>
                <p>Sign in to your account</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email} name="email" onChange={handleChange} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={user.password} name="password" onChange={handleChange} />

                    <button type='submit' disabled={loader ? 'disabled' : null}>{!loader ? 'Login' : 'Wait...'}</button>
                </form>
                <div>
                    <label>Forgot your password? <Link to="/forgot">Reset Password</Link></label>
                    <label>Don't Have Account  !!  <Link to="/SignUp">   Register Now</Link></label>

                </div>
            </div>
        </div>
    );
}
