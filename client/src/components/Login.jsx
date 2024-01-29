import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigation = useNavigate();
    const handleLogin = async () => {
      try {
        const result = await fetch(`${process.env.REACT_APP_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
    
        if (result.ok) {
          const data = await result.json();
          console.log(data);
   
          localStorage.setItem('token', data.token); 
          navigation("/")

        } else {
          console.log('Login failed');
          alert("wrong credentials")
          setEmail("")
          setPassword("")
          
        }
      } catch (e) {
        console.log(e);
      }
    };
    
    
    return (
      <> 
      <Navbar >

      </Navbar>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
           
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-15 w-auto"
              src="https://media.licdn.com/dms/image/C4E0BAQGztnafvmikYA/company-logo_200_200/0/1644048490840/reunion_one_logo?e=2147483647&v=beta&t=6_1HS-marM2LiAOeQR5NBiCc2za-OR8NACGH9foQG-A"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between ">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 ">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 mt-10">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
              </div>
  
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
      
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                SignUp
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  