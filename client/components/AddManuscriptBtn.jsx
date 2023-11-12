import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { v4 as uuidV4 } from 'uuid'
import { useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function AddManuscriptBtn({ docs, setDocs }) {
    const [open, setOpen] = useState(false)
    const nameRef = useRef()
    const { auth } = useAuth()

    // Creates a new manuscript
    const createNewManuscript = () => {
        const newProject = {
            name: nameRef.current.value,
            id: uuidV4(),
            creator: auth?.username
        }
        // Set the parent component's state to reflect the new manuscript
        setDocs([...docs, newProject])
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                title='Create new manuscript'
                className='create-project-button'>
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
            {/* <img
                src="/images/AddProjectIcon.png"
                alt="Create new manuscript"
                title="Create New Manuscript"
                className="create-project-button"
                onClick={() => setOpen(true)} /> */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogContent id="doc-dialog">
                    <div>
                        <label htmlFor="doc-title">Name</label>
                        <br />
                        <input type="text" id="doc-title" ref={nameRef} autoFocus required placeholder="Enter name here..." />
                    </div>

                    <div id="button-div">
                        <button onClick={() => setOpen(false)}>Cancel</button>
                        <button onClick={createNewManuscript}>Create Manuscript</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
