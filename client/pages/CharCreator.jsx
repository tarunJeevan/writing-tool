import { useState, useEffect } from 'react'
import Profile from '../components/Profile'
import AddNewPost from '../components/AddNewPost'
import PostContainer from '../components/PostContainer'
import '../styles/charCreator.css'
import Login from './Login'

export default function CharCreator() {
    // TODO: Update this to use database instead of local storage
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem("POSTS") // Get any saved posts from local storage        
        if (savedPosts == null) return [] // If there are no saved posts, set an empty array as the default value

        return JSON.parse(savedPosts) // If there are saved posts, set it as the default value
    })

    // Save character posts each time one is added
    useEffect(() => {
        localStorage.setItem("POSTS", JSON.stringify(posts))
    }, [posts])

    return (
        <section id='creator-container'>
            <Profile />

            <article id="char-info">
                <AddNewPost posts={posts} setPosts={setPosts} />
                <PostContainer posts={posts} />
            </article>
        </section>
    )
}