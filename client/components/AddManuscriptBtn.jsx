import { v4 as uuidV4 } from 'uuid'
import { useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddManuscriptBtn({ docs, setDocs }) {
    const [open, setOpen] = useState(false)
    const nameRef = useRef()
    const { auth } = useAuth()

    // Creates a new manuscript
    const createNewManuscript = e => {
        e.preventDefault()

        const newProject = {
            name: nameRef.current.value,
            _id: uuidV4(),
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
                <FontAwesomeIcon icon={faFileCirclePlus} size='xl' />
            </button>
            <Modal show={open} onHide={() => { setOpen(false) }}>
                <Form onSubmit={createNewManuscript}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Manuscript Name</Form.Label>
                            <Form.Control type='text' autoFocus required ref={nameRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setOpen(false)}>
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
