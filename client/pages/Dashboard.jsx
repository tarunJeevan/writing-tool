import { useEffect, useState } from 'react'
import '../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'
import usePopulateDocs from '../hooks/usePopulateDocs'
import AddNewManuscript from '../components/AddNewManuscript'

export default function Dashboard() {
    const populateDocs = usePopulateDocs()
    const [docs, setDocs] = useState([])

    // TODO: Try useEffect to set docs state when Promise is resolved
    useEffect(() => {
        (async () => {
            const result = await populateDocs()
            // console.log(result)
            setDocs(result)
        })()
    }, [])

    // Navigation
    const navigate = useNavigate()

    const openManuscript = (manuscript) => {
        const { id, name, creator } = manuscript
        navigate(`/documents/${id}`, { state: { 'creator': creator, 'name': name } })
    }

    return (
        <section id="dashboard-container">
            <h2>
                My Projects
                <AddNewManuscript docs={docs} setDocs={setDocs} />
            </h2>

            {/* Contains all projects */}
            <section className="project-list">
                {docs.length === 0
                    ? "Add new manuscripts with the above button!"
                    : docs.map((manuscript, index) => {
                        return (
                            <button key={index} className="project-list-item" onClick={() => openManuscript(manuscript)}>
                                {manuscript.name}
                            </button>
                        )
                    })}
            </section>
        </section>
    )
}