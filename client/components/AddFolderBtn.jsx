import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Modal } from 'react-bootstrap'
import { useRef } from 'react'

export default function AddNewFolder() {
    const [open, setOpen] = useState(false)
    const nameRef = useRef()

    const createNewFolder = e => {
        e.preventDefault()

        // TODO: Create a new folder to be rendered in the Dashboard and saved in the database
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
