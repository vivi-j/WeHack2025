import React, { useState, useEffect } from 'react'
import {doSignInWithEmailAndPassword} from '../firebase/auth'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();
  
    useEffect(() => {
      if (userLoggedIn) {
        console.log('User is logged in');
        navigate('/dashboard');
      }
    }, [userLoggedIn, navigate]);
    
    const onSubmit = async (e) => {
      e.preventDefault();
      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await doSignInWithEmailAndPassword(email, password);
        } catch (error) {
          setErrorMessage(error.message || 'Failed to sign in');
          setIsSigningIn(false);
        }
      }
    };
  


    const navigateToRegister = (e) => {
        e.preventDefault()
        window.location.href = '/signup'
    }

    return (
        <div>
            <main className="w-full h-screen flex bg-[#0B0003] self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 bg-[#483137] border-[#E7C0BC] border-4 shadow-xl border rounded-3xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="font-montserrat text-xl text-[#E7C0BC] font-semibold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-montserrat text-sm font-montserrat text-[#E7C0BC] font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="font-montserrat text-sm text-[#E7C0BC] font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-3xl ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8B3C46] hover:bg-[#73313a] hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="font-montserrat text-center text-[#E7C0BC] text-sm">Don't have an account? <a href="/register" onClick={navigateToRegister} className="hover:underline hover:text-[#8B3C46] font-bold">Sign up</a></p>
                    
                </div>
            </main>
        </div>
    )
}

export default Login