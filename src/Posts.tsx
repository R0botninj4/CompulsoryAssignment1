import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function ListPosts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [cats, setCats] = useState<Cat[]>([]);

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.posts)
            });
    }, []);

    useEffect(() => {
        fetch('https://cataas.com/api/cats?limit=30')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Cataas svarede med status ${res.status}`);
                }

                return res.json();
            })
            .then((json) => {
                setCats(json);
            })
            .catch((error) => {
                console.log('Kunne ikke hente katte:', error);
            });
    }, []);

    function removePost(id: number) {
        const duplicate = [...posts];
        const filteredArray = duplicate.filter(p => p.id != id)
        setPosts(filteredArray)
    }

    return (
        <div>
            {posts.map((post) => {
                const cat = cats[post.id - 1];

                return (
                    <MyChildComponent
                        key={post.id}
                        post={post}
                        image={cat ? `https://cataas.com/cat/${cat.id}` : ''}
                        removePost={removePost}
                    />
                );
            })}
        </div>
    );
}

interface MyChildComponentProps {
    post: Post;
    image: string;
    removePost: (id: number) => void;
}

function MyChildComponent({
                              post,
                              image,
                              removePost,
                          }: MyChildComponentProps) {
    const [comments, setComments] = useState<PostComment[]>([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/posts/${post.id}/comments`)
            .then(res => res.json())
            .then((json) => {
                setComments(json.comments);
            });
    }, [post.id]);

    return (
        <div style={{ marginBottom: "50px" }}>
            {image && (
                <img
                    src={image}
                    alt={post.title}
                    width="300"
                />
            )}

            <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>

            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>@{comment.user.username}</strong>
                    <p>{comment.body}</p>
                </div>
            ))}

            <button onClick={() => removePost(post.id)}>
                Delete post
            </button>
        </div>
    );
}

interface Cat {
    id: string;
}

interface PostComment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
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