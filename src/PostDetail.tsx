import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "./Posts.tsx";

export function PostDetail() {
    const { id } = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`https://dummyjson.com/posts/${id}`).then(res => res.json()),
            fetch(`https://dummyjson.com/posts/${id}/comments`).then(res => res.json()),
        ]).then(([postJson, commentsJson]) => {
            setPost(postJson);
            setComments(commentsJson.comments);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

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
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}