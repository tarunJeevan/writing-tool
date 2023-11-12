import { useRef, useState } from "react"
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

export default function AddNewPost({ posts, setPosts }) {
    const [open, setOpen] = useState(false)

    // References
    const titleRef = useRef()
    const descRef = useRef()

    const addNewInfoBlock = () => {
        // Create pop up dialog box to take post info
        const newPost = {
            title: titleRef.current.value,
            description: descRef.current.value
        }

        setPosts([...posts, newPost])
        setOpen(false)
    }

    return (
        <>
            <button id="add-info-btn" onClick={() => setOpen(true)}>Add to profile</button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogContent id="post-dialog">
                    <div>
                        <label htmlFor="post-title">Title</label>
                        <br/>
                        <input type="text" name="post-title" id="post-title" ref={titleRef} placeholder="Enter title here..." />
                    </div>

                    <div>
                        <label htmlFor="post-desc">Description</label>
                        <br/>
                        <textarea id="post-desc" name="post-desc" ref={descRef} placeholder="Enter description here..."></textarea>
                    </div>

                    <div id="button-div">
                        <button onClick={() => setOpen(false)}>Cancel</button>
                        <button onClick={addNewInfoBlock}>Add Post</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}