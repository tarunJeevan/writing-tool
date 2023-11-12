import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import '../styles/signup.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,19}$/
const PSWD_REGEX = /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z0-9]).{8,32}$/
const REGISTER_URL = '/register'

export default function Signup() {
    // User info states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [matchPswd, setMatchPswd] = useState('')

    // Page status states
    const [success, setSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    // References
    const errorRef = useRef()
    const usernameRef = useRef()

    // Helper states for tooltip logic
    const [usernameFocus, setUsernameFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    // User info validity states
    const [validUsername, setValidUsername] = useState(false)
    const [validPswd, setValidPswd] = useState(false)
    const [validMatch, setValidMatch] = useState(false)

    // Submit handler
    const submitSignup = async (e) => {
        e.preventDefault()
        // Extra check in case button is prematurely enabled by user
        const check1 = USER_REGEX.test(username);
        const check2 = PSWD_REGEX.test(password);
        if (!check1 || !check2) {
            setErrorMsg("Invalid Entry")
            return
        }

        // Register user with server
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })

            setSuccess(true)

            // Clear all fields
            setUsername('')
            setPassword('')
            setMatchPswd('')
        } catch (err) {
            if (!err?.response)
                setErrorMsg('No Server Response')
            else if (err.response?.status === 409)
                setErrorMsg('Username taken')
            else
                setErrorMsg('Registration failed')
        }
    }

    const onUsernameChange = e => {
        setUsername(e.target.value)
        setErrorMsg('')
    }

    const onPasswordChange = e => {
        setPassword(e.target.value)
        setErrorMsg('')
    }

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPswd(PSWD_REGEX.test(password))
        setValidMatch(password === matchPswd)
    }, [password, matchPswd])

    return (
        <>
            {success ? (
                <section id='signup-container'>
                    <h1>Success!</h1>
                    <p><Link to='/login'>Sign In</Link></p>
                </section>
            ) :
                <section id="signup-container">
                    <p ref={errorRef} className={errorMsg ? 'errorMsg' : 'offsreen'}>
                        {errorMsg}
                    </p >
                    {/* Registration form */}
                    <form onSubmit={submitSignup} id="signup-form">
                        <h2 id="signup-header">Sign Up</h2>

                        {/* Username field */}
                        <label htmlFor="username" className="signup-label">
                            Username
                        </label>
                        <input
                            ref={usernameRef}
                            type="text"
                            id="username"
                            autoComplete='off'
                            required
                            onChange={onUsernameChange}
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                            className={`form-input-field ${validUsername ? 'valid' : 'invalid'}`}
                        />
                        {/* Username tooltip */}
                        <ul className={usernameFocus && username && !validUsername ? 'instructions' : 'offscreen'}>
                            <li>5 to 20 characters</li>
                            <li>Must begin with a letter</li>
                            <li>Letters, numbers, hyphens, and underscore allowed</li>
                        </ul>
                        <br />

                        {/* Password field */}
                        <label htmlFor="password" className="signup-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            onChange={onPasswordChange}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            className={`form-input-field ${validPswd ? 'valid' : 'invalid'}`}
                        />
                        {/* Password tooltip */}
                        <ul className={passwordFocus && !validPswd ? 'instructions' : 'offscreen'}>
                            <li>8 to 32 characters</li>
                            <li>
                                Must include:
                                <ul>
                                    <li>Uppercase and lowercase letters</li>
                                    <li>At least one number</li>
                                    <li>At least one special character</li>
                                </ul>
                            </li>
                        </ul>
                        <br />

                        {/* Confirm password field */}
                        <label htmlFor="matchPswd" className="signup-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="matchPswd"
                            required
                            onChange={e => setMatchPswd(e.target.value)}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className={`form-input-field ${validMatch ? 'valid' : 'invalid'}`}
                        />
                        {/* Confirm password tooltip */}
                        <p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            Must match the password field!
                        </p>
                        <br />

                        {/* Submit Button */}
                        <button
                            id='signup-button'
                            className={!validUsername || !validPswd || !validMatch ? 'disabled' : ''}
                            disabled={(!validUsername || !validPswd || !validMatch) ? true : false}>
                            Sign Up
                        </button>
                    </form>
                    <label>
                        Already registered?
                        <Link to="/login" className="page-link">Sign In</Link>
                    </label>
                </section >
            }
        </>
    )
}
