import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from '../api/axios'
import useAuth from "../hooks/useAuth"
import '../styles/login.css'

const LOGIN_URL = '/login'

export default function Login() {
    // Context
    const { setAuth } = useAuth()

    // References
    const usernameRef = useRef()
    const passwordRef = useRef()

    // States
    const [errorMsg, setErrorMsg] = useState('')

    // Navigation
    const navigate = useNavigate()

    // Form submission handler
    const submitLogin = async (e) => {
        e.preventDefault()

        const username = usernameRef.current.value
        const password = passwordRef.current.value

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const accessToken = response?.data?.accessToken
            console.log(JSON.stringify(accessToken))
            // const roles = response?.data?.roles

            // TODO: Set auth state with roles and access token
            setAuth({ username, password, accessToken })

            // Clean up input fields
            usernameRef.current.value = ''
            passwordRef.current.value = ''

            // Navigate to dashboard upon successful login
            navigate('/')
        } catch (err) {
            if (!err?.response)
                setErrorMsg('No server response')
            else if (err.response?.status === 400 || err.response?.status === 401) // Bad request OR Unauthorized
                setErrorMsg(err.response.data.message)
            else
                setErrorMsg(`Sign in failed. ERROR: ${err.response.data.message}`)
        }

    }

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    return (
        <section id="login-container">
            {/* Error message display */}
            <p className={errorMsg ? 'errorMsg' : 'offsreen'}>
                {errorMsg}
            </p >
            {/* Login form */}
            <form onSubmit={submitLogin} id="login-form">
                <h2 id="login-header">Login</h2>

                {/* Username field */}
                <label htmlFor="username" className="login-label">
                    Username
                </label>
                <input
                    type="text"
                    ref={usernameRef}
                    id="username"
                    required
                    className="form-input-field"
                    onChange={e => setErrorMsg('')}
                />
                <br />

                {/* Password field */}
                <label htmlFor="password" className="login-label">
                    Password
                </label>
                <input
                    type="password"
                    ref={passwordRef}
                    id="password"
                    required
                    className="form-input-field"
                    onChange={e => setErrorMsg('')}
                />
                <br />

                {/* Submit button */}
                <button className="login-button">
                    Log In
                </button>
            </form>

            <label>
                Don't have an account?
                <Link to="/signup" className="page-link">Sign Up</Link>
            </label>
        </section>
    )
}