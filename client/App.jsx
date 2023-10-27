import { useEffect, useState } from "react";
import './styles/charCreator.css'
import AddNewPost from "./components/AddNewPost";
import PostContainer from "./components/PostContainer";
import Profile from "./components/Profile";
import { Navbar } from "./components/Navbar";
// import Login from "./components/Login";
// import Settings from "./components/Settings"
// import Dashboard from "./components/Dashboard";

export default function App() {
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
        <>
            <Navbar />
            <main>
                <Profile />

                <article id="char-info">
                    <AddNewPost posts={posts} setPosts={setPosts} />
                    <PostContainer posts={posts} />
                </article>
            </main>
        </>
    )
}