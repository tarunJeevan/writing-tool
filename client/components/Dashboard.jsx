import '../styles/dashboard.css'

export default function Dashboard() {

    return (
        <main id="dashboard-container">
            <h2>
                My Projects
                {/* TODO: Add onClick function to create new project */}
                <img src="/images/AddProjectIcon.png" alt="Create new project" title="Create New Project"
                    className="create-project-button" onClick="" />
            </h2>

            <section className="project-list">
                {/* Contains all projects */}
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
                <button onClick="" className="project-list-item">Example project</button>
            </section>
        </main>
    )
}