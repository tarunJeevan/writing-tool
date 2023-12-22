import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Modal } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { useRef } from 'react'
import useAuth from '../hooks/useAuth'

export default function AddNewFolder({ currentFolder }) {
    const [open, setOpen] = useState(false)
    const nameRef = useRef()

    const createNewFolder = async e => {
        e.preventDefault()
        if (currentFolder == null) return

        const { auth } = useAuth()

        // Create a new folder to be rendered in the Dashboard and saved in the database
        const response = await axios.post('/folder',
            JSON.stringify({ creator: auth.username, name: nameRef.current.value, parentId: currentFolder.id, _id: uuidV4() }),
            {
                headers: { 'Authorization': `Bearer ${auth?.accessToken}`, 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        // Cleanup
        nameRef.current.value = ''
        closeModal()
    }

    const closeModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Button>
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={createNewFolder}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type='text' required ref={nameRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant='success' type='submit'>
                            Create
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
