// Navbar with a customizable title and list of page links

import '../styles/navbar.css'

export function Navbar() {
    
    return (
        <nav className="nav">
            <a href="/dashboard" className="site-name">Writing Tool</a>

            <ul>
                <CustomLink to={"/charcreator"} name={"Creator"} />
                <CustomLink to={"/settings"} name={"Settings"} />
                <CustomLink to={"/login"} name={"Login"} />
            </ul>
        </nav>
    )
}

function CustomLink({to, name}) {
    const isActive = false // Update after setting up react router

    return (
        <li className={isActive ? "active" : ""}>
            <a href={to}>{name}</a>
        </li>
    )
}