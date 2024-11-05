import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../store/firebase';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user); 
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid email or password');
    }
  };
  return (
    <div className="bg-login flex flex-col items-center justify-center min-h-screen">
      <div className="bg-neutral-900 w-[500px] h-[550px] shadow-md rounded px-20 pt-12">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[60px] text-xl bg-neutral-600 mt-1 p-2 w-full border text-neutral-100 border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[60px] text-xl bg-neutral-600 mt-1 p-2 w-full border border-gray-300 text-neutral-100 rounded-md shadow-sm"
            />
          </div>

          <div className="flex items-center justify-center flex-col gap-4 pt-2">
            <button
              type="submit"
              className="h-[50px] w-full text-white font-bold text-center items-center px-4 py-2 bg-red-600 border border-transparent rounded-md hover:scale-105 transition-all"
            >
              Login
            </button>
            <h2>OR</h2>
            <button
              type="submit"
              className="h-[50px] w-full text-white font-bold text-center items-center px-4 py-2 bg-red-600 border border-transparent rounded-md hover:scale-105 transition-all"
            >
              Log in with Google
            </button>
            <Link to={"/"}>Forgot password?</Link>
            <div className="inline-flex gap-2">
              <p>New to Widercames?</p>
              <Link to={"/register"} className="text-white font-bold cursor-pointer">Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
