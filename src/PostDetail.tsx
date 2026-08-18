import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Post } from "./Posts.tsx";

export function PostDetail() {
    const { id } = useParams();
    const location = useLocation();
    const localPost = (location.state as { post?: Post } | null)?.post;

    const [post, setPost] = useState<Post | null>(localPost ?? null);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localPost) {
            setPost(localPost);
            setLoading(false);
        } else {
            fetch(`https://dummyjson.com/posts/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Post not found");
                    return res.json();
                })
                .then(json => setPost(json))
                .catch(() => setPost(null))
                .finally(() => setLoading(false));
        }

        fetch(`https://dummyjson.com/posts/${id}/comments`)
            .then(res => {
                if (!res.ok) return { comments: [] };
                return res.json();
            })
            .then(json => setComments(json.comments || []))
            .catch(() => setComments([]));
    }, [id, localPost]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    width="300"
                />
            )}

            <h3>Comments ({comments.length})</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>@{comment.user.username}</strong>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    );
}

interface PostComment {
    id: number;
    body: string;
    user: {
        username: string;
    };
}
