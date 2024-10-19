import React, { useState } from "react";
import '../App.css'
import { Link } from "react-router-dom";
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault(); 
        // Validate passwords (ensure they match)
        if (password !== confirmPassword) {
          alert('Passwords do not match. Please try again.');
          return;
        }
        document.cookie = `username=${username}`;
        document.cookie = `password=${password}`;
        window.location.href = '/login'; 
      };


  return (
    <div className="bg-login flex flex-col items-center justify-center min-h-screen">
      <div className="bg-neutral-900 w-[600px] h-[650px] shadow-md rounded px-20 pt-12">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-[60px] text-xl bg-neutral-600 mt-1 p-2 w-full border text-neutral-100 border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[60px] text-xl bg-neutral-600 mt-1 p-2 w-full border border-gray-300 text-neutral-100 rounded-md shadow-sm"
            />
          </div>
          <div>
            <input
              type="password"  
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="h-[60px] text-xl bg-neutral-600 mt-1 p-2 w-full border border-gray-300 text-neutral-100 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-4 pt-2">
            <button
              type="submit"
              className="h-[50px] w-full text-white font-bold text-center items-center px-4 py-2 bg-red-600 border border-transparent rounded-md hover:scale-105 transition-all"
            >
              Register
            </button>
            <h2>OR</h2>
            <button
              type="submit"
              className="h-[50px] w-full text-white font-bold text-center items-center px-4 py-2 bg-red-600 border border-transparent rounded-md hover:scale-105 transition-all"
            >
              Register with Google
            </button>
            <div className="inline-flex gap-2">
              <p>You have an account yet?</p>
              <Link to={"/login"} className="text-white font-bold cursor-pointer">Login now</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
