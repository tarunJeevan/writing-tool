import { useRef } from "react"
import '../styles/login.css'

export default function Login() {
    const emailRef = useRef()

    const submitLogin = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        // Send request to server with email value
    }

    return (
        <main id="login-container">
            <form onSubmit={submitLogin} id="login-form">
                <h2 id="login-header">Login</h2>

                <label for="username" class="login-label">
                    Email
                </label>
                <input type="email" ref={emailRef} id="username" class="form-input-field" placeholder="example@example.com" />
                <br />

                <button type="submit" class="login-button">
                    Log In
                </button>

                {/* Add Forgot Password page URL to href */}
                <a href="" class="page-link">Forgot Password?</a>
            </form>

            <label>
                Don't have an account?
                {/* Add Sign up page URL to href */}
                <a href="" class="page-link"> Sign up</a>
            </label>
        </main >
    )
}