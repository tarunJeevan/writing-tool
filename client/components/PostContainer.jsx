// Contains all the posts that describe the character and a button that creates a form to add a new post

export default function PostContainer({ posts }) {
    // Make the list of posts sortable as well
    return (
        <ul id="new-char-info">
            {/* new posts added here as list items */}
            {posts.length === 0 && "Add new posts with the above button!"}
            {posts.map((post, index) => {
                return (
                    <li key={index}>
                        <details>
                            <summary>
                                {post.title}
                            </summary>
                            {post.description}
                        </details>
                    </li>
                )
            })}
        </ul>
    )
}