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
    const [image, setImage] = useState("");

    useEffect(() => {
        fetch("https://api.waifu.im/images?IncludedTags=marin-kitagawa&IsNsfw=False")  //her ændre du ipa til image lige nu er det en baddie
            .then((res) => res.json())
            .then((json) => {
                setImage(json.items[0].url);
            });
    }, []);

    return (
        <div style={{ marginBottom: "50px" }}>
            {image && (
                <img
                    src={image}
                    alt={post.title}
                    width="300"
                />
            )}

            <h2>{post.title}</h2>

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