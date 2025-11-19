import React, { useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function PostForm({ signup }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full lg:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-2">
                {signup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 font-sans mb-10">
                {signup
                    ? "Enter your details to create your account"
                    : "Enter your email and password to access your account"}
            </p>

            <form className="w-full space-y-6">
                {signup && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete={signup ? "new-password" : "current-password"}
                            required
                            className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                </div>

                {signup && (
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>
                )}

                {!signup && (
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                        </div>
                        <div>
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot Password?</a>
                        </div>
                    </div>
                )}

                <div className="space-y-4 pt-2">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                    >
                        {signup ? "Sign Up" : "Sign In"}
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <FcGoogle className="mr-3" size={22} />
                        {signup ? "Sign up with Google" : "Sign in with Google"}
                    </button>
                </div>
            </form>

            <p className="mt-12 text-center text-sm text-gray-600">
                {signup
                    ? <>Already have an account?{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </a>
                    </>
                    : <>Don't have an account?{' '}
                        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </>
                }
            </p>
        </div>
    );
}

export default PostForm;