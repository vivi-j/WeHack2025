import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    // Replace useNavigate with window.location
    const navigateToLogin = (e) => {
        if (e) e.preventDefault()
        window.location.href = '/login'
    }

    // Replace Navigate component with useEffect
    useEffect(() => {
        if (userLoggedIn) {
            window.location.href = '/dashboard'
        }
    }, [userLoggedIn])

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            <main className="w-full h-screen flex self-center bg-[#0B0003] place-content-center place-items-center">
                <div className="w-96 text-gray-600 bg-[#483137] border-[#E7C0BC] border-4 space-y-5 p-4 shadow-xl border rounded-3xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="font-montserrat text-xl text-[#E7C0BC] font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="font-montserrat text-sm text-[#E7C0BC] font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 bg-gray-300 text-gray-500 outline-none border border-[#8B3C46] focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="font-montserrat text-sm text-[#E7C0BC] font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-gray-300 outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="font-montserrat text-sm text-[#E7C0BC] font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-gray-300 outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-[#E7C0BC] font-medium rounded-3xl ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#8B3C46] hover:bg-[#73313a] hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="font-montserrat text-sm text-[#E7C0BC] text-center">
                            Already have an account? {'   '}
                            <a href="/login" onClick={navigateToLogin} className="text-[#E7C0BC] hover:underline hover:text-[#8B3C46] font-bold">
                                Continue
                            </a>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Register