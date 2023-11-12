import { Link } from "react-router-dom"

export default function Missing() {

    return (
        <section style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem' }}>
                Oops!
            </h1>

            <p style={{fontSize: '1.5rem'}}>
                Page Not Found
            </p>
            
            <p><Link to='/'>Back to the Dashboard?</Link></p>
        </section>
    )
}