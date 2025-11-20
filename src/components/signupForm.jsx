import { AiOutlineEye as Eye, AiOutlineEyeInvisible as EyeOff } from 'react-icons/ai';
import React, { useState } from "react";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
                username,
                email,
                password,
            });
            setSuccess('Register successful! You can now log in.');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('An error occurred while trying to register. Please try again later.');
            console.error(err);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="w-1/2 m-auto px-28">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600 font-sans mb-10">Enter your email and password to access your account</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <Navigate to="/login" replace={true} />}
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-gray-900 cursor-pointer">Remember me</label>
                    </div>
                    <div>
                        <button type="button" className="font-medium text-blue-600 hover:text-blue-500">Forgot Password?</button>
                    </div>
                </div>

                <div className="space-y-4 pt-2">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50"
                    >Login
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <FcGoogle className="mr-2" />
                        Sign in with Google
                    </button>
                </div>
            </form>

            <p className="mt-12 text-center text-sm text-gray-600">
                Login have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignupForm;