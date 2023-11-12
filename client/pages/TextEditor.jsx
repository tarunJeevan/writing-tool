import 'quill/dist/quill.snow.css'
import '../styles/textEditor.css'
import Quill from 'quill'
import { io } from 'socket.io-client'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const TOOLBAR_OPTIONS = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '+1' }, { 'indent': '-1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'blockquote', 'code-block'],
    ['clean']
]
const SAVE_INTERVAL_MS = 2000

export default function TextEditor() {
    // State
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    // navigation
    const location = useLocation()
    const { id: documentId } = useParams()

    // Document properties
    const { creator, name } = location.state

    // Set up socket connection with server
    useEffect(() => {
        const s = io('http://localhost:3000')
        setSocket(s)

        return () => s.disconnect()
    }, [])

    // Send changes in document to server (for document sharing and saving)
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill.on('text-change', handler)

        return () => quill.off('text-change', handler)
    }, [socket, quill])

    // Get changes from server to update the document (for document sharing)
    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = delta => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return () => socket.off('receive-changes', handler)
    }, [socket, quill])

    // Put users in their own 'rooms' if they have different document ids
    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentId, name, creator)
    }, [socket, quill, documentId])

    // Save document data every interval
    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL_MS)

        return () => clearInterval(interval)
    }, [socket, quill])

    // Set up text editor
    const containerRef = useCallback(container => {
        // Check if container exists. Return if it doesn't
        if (container == null) return

        // Empty out container
        container.innerHTML = ''

        // Create and append editor to the container
        const editor = document.createElement('div')
        container.appendChild(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        q.disable()
        q.setText('Loading...')
        setQuill(q)
    }, [])

    return (
        <section id='editor-container' ref={containerRef}></section>
    )
}