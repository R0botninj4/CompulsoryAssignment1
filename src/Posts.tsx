import {useEffect, useState} from "react";

export function ListPosts() {

    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.posts)
            });
    }, []);

    function removePost(id: number) {
        const duplicate = [...posts];
        const filteredArray = duplicate.filter(p => p.id != id)
        setPosts(filteredArray)
    }

    return (
        <div>
            {posts.map((post) => (
                <MyChildComponent
                    key={post.id}
                    post={post}
                    removePost={removePost}
                />
            ))}
        </div>
    );
}

interface MyChildComponentProps {
    post: Post;
    removePost: (id: number) => void;
}

function MyChildComponent({
    post,
    removePost,
}: MyChildComponentProps) {
    return (
        <div
            style={{
                marginBottom: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
            }}
        >
            <img
                src={`https://dummyjson.com/image/300x150?text=Post+${post.id}`}
                alt={post.title}
            />

            <h2 style={{ margin: 0 }}>
                {post.title}
            </h2>

            <button onClick={() => removePost(post.id)}>
                Delete post
            </button>
        </div>
    );
}



export interface Root {
    posts: Post[]
    total: number
    skip: number
    limit: number
}

export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
}

export interface Reactions {
    likes: number
    dislikes: number
}