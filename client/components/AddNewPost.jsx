import { useState } from "react"
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

export default function AddNewPost({ posts, setPosts }) {
    const [open, setOpen] = useState(false)

    const addNewInfoBlock = () => {
        // Create pop up dialog box to take post info
        const postTitle = document.getElementById("post-title").value
        const postDesc = document.getElementById("post-desc").value
        const newPost = {
            title: postTitle,
            description: postDesc
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
                        <input type="text" name="post-title" id="post-title" placeholder="Enter title here..." />
                    </div>

                    <div>
                        <label htmlFor="post-desc">Description</label>
                        <br/>
                        <textarea placeholder="Enter description here..." id="post-desc" name="post-desc"></textarea>
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