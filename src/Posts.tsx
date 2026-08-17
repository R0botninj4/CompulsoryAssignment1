import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function ListPosts() {

    const [posts, setPosts] = useState<Post[]>([]);
    const [images, setImages] = useState<DanbooruImage[]>([]);
    const [visiblePosts, setVisiblePosts] = useState(5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.posts)
            });
    }, []);

    useEffect(() => {
        fetch('https://danbooru.donmai.us/posts.json?tags=kitagawa_marin+rating%3Ageneral+filetype%3Ajpg&limit=30')
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
        const duplicate = [...posts];
        const filteredArray = duplicate.filter(p => p.id != id)
        setPosts(filteredArray)
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setVisiblePosts(5);
                    }}
                />
            </div>

            {filteredPosts.slice(0, visiblePosts).map((post) => {
                return (
                    <MyChildComponent
                        key={post.id}
                        post={post}
                        image={images[post.id - 1]?.large_file_url ?? ''}
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
    return (
        <div style={{ marginBottom: "50px" }}>
            {image && (
                <img
                    src={image}
                    alt={post.title}
                    width="300"
                    loading="lazy"
                />
            )}

            <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>

            <button onClick={() => removePost(post.id)}>
                Delete post
            </button>
        </div>
    );
}

interface DanbooruImage {
    id: number;
    large_file_url: string;
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
