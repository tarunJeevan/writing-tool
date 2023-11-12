import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Unauthorized() {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login')
        }, 2000);

        return () => clearTimeout(timer)
    }, [])

    return (
        <section style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem' }}>
                Unauthorized
            </h1>

            <p style={{ fontSize: '1.5rem' }}>
                You will be redirected to the login page shortly
            </p>
        </section>
    )
}