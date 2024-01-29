import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
const navigation = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const result = await fetch(`${process.env.REACT_APP_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (result.ok) {
        const data = await result.json();
        navigation("/login")
        
      } else {
        console.error('Server responded with an error:', result.status);
      }
    } catch (e) {
      console.error('Error during fetch:', e);
    }
  };
  
  return (
    <>
      <div className="bg-white min-h-screen flex flex-col font-serif">
      <Navbar />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-half">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="number"
            placeholder="Contact Number"
            onChange={handleChange}
          />

          <input
            type="password"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            className="block border border-gray-300 w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none my-1"
            onClick={handleSignup}
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            By signing up, you agree to the{" "}
            <a className="border-b border-gray-600" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="border-b border-gray-600" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-gray-600 mt-6">
          Already have an account?{" "}
          <a className="border-b border-blue-500" href="/login">
            Log in
          </a>
          .
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp;
