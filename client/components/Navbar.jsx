import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom'
import '../styles/navbar.css'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
    const { auth } = useAuth()

    return (
        <>
            <nav className="nav">
                <Link to="/" className="site-name">Writing Tool</Link>

                <ul>
                    <CustomLink to={"/char"} name={"Character"} />
                    <CustomLink to={"/settings"} name={"Settings"} />
                    {auth?.accessToken
                        && <CustomLink to={'/logout'} name={'Logout'} />
                    }

                </ul>
            </nav>
            <Outlet />
        </>
    )
}

function CustomLink({ to, name }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to}>{name}</Link>
        </li>
    )
}