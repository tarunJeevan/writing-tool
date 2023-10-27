import '../styles/settings.css'

export default function Settings() {

    // TODO: Add functionality to buttons
    return (
        <main id="settings-container">
            <h2>Settings</h2>
            <section className="options-list">
                <button className="options-list-item">Toggle Dark Mode</button>
                <button className="options-list-item">Change Password</button>
                <button className="options-list-item">Enable Two-Factor Authentication</button>
                <button className="options-list-item">Delete Account</button>
            </section>
        </main>
    )
}