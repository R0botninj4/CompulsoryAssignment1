import {useEffect, useState, type FormEvent} from "react";
import { Link, useOutletContext } from "react-router-dom";
import type { LayoutContext } from "./Layout";



export function ListPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [images, setImages] = useState<DanbooruImage[]>([]);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [newImage, setNewImage] = useState("");
    const { search, showCreatePost, closeCreatePost } =
        useOutletContext<LayoutContext>();

    const apiSearch = "kitagawa_marin";

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.posts);
            });
    }, []);

    useEffect(() => {
        fetch(`https://danbooru.donmai.us/posts.json?tags=${apiSearch}+rating%3Ageneral+filetype%3Ajpg&limit=30`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Danbooru svarede med status ${res.status}`);
                }

                return res.json();
            })
            .then((json) => {
                setImages(json);
            })
            .catch((error) => {
                console.log('Kunne ikke hente Marin-billeder:', error);
            });
    }, []);

    function removePost(id: number) {
        setPosts(posts.filter(post => post.id !== id));
    }

    function createPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: newTitle,
                body: newBody,
                userId: 5,
            }),
        })
            .then(res => res.json())
            .then(() => {
                const createdPost: Post = {
                    id: Date.now(),
                    title: newTitle,
                    body: newBody,
                    image: newImage,
                };

                setPosts([createdPost, ...posts]);
                setNewTitle("");
                setNewBody("");
                setNewImage("");
                closeCreatePost();
            })
            .catch(error => console.log('Kunne ikke oprette posten:', error));
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {showCreatePost && (
                <div className="create-post-overlay">
                    <form className="create-post-modal" onSubmit={createPost}>
                        <button
                            type="button"
                            className="close-modal-button"
                            onClick={closeCreatePost}
                        >
                            ×
                        </button>

                        <h2>Create post</h2>

                        <input
                            type="text"
                            placeholder="Title"
                            value={newTitle}
                            onChange={(event) => setNewTitle(event.target.value)}
                            required
                        />

                        <textarea
                            placeholder="What is happening?"
                            value={newBody}
                            onChange={(event) => setNewBody(event.target.value)}
                            required
                        />

                        <input
                            type="url"
                            placeholder="Image URL"
                            value={newImage}
                            onChange={(event) => setNewImage(event.target.value)}
                            required
                        />

                        {newImage && (
                            <img
                                className="create-post-preview"
                                src={newImage}
                                alt="Preview"
                            />
                        )}

                        <button type="submit">Post</button>
                    </form>
                </div>
            )}

            {filteredPosts.slice(0, visiblePosts).map((post) => {
                const image =
                    post.image || images[post.id - 1]?.large_file_url || "";

                return (
                    <PostCard
                        key={post.id}
                        post={post}
                        image={image}
                        removePost={removePost}
                    />
                );
            })}

            {visiblePosts < filteredPosts.length && (
                <button onClick={() => setVisiblePosts(visiblePosts + 5)}>
                    Load more
                </button>
            )}
        </div>
    );
}

interface PostCardProps {
    post: Post;
    image: string;
    removePost: (id: number) => void;
}

function PostCard({ post, image, removePost }: PostCardProps) {
    return (
        <div className="post-card">
            {image && (
                <img
                    src={image}
                    alt={post.title}
                    width="300"
                    loading="lazy"
                />
            )}

            <Link
                to={`/posts/${post.id}`}
                state={{ post: { ...post, image } }}
            >
                <h2>{post.title}</h2>
            </Link>

            <button onClick={() => removePost(post.id)}>
                Delete post
            </button>
        </div>
    );
}

interface DanbooruImage {
    large_file_url: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    image?: string;
}
