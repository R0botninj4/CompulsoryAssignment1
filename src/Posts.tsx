import {useEffect, useState} from "react";

export function ListPosts() {

    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((json) => {
                setPosts(json.products)
            });
    }, []);

    function removePost(id: number) {
        const duplicate = [...posts];
        const filteredArray = duplicate.filter(p => p.id != id)
        setPosts(filteredArray)
    }

    return <div>
        {
            posts.map(p => {
                return <div>
                    <MyChildComponent key={p.id} post={p}
                                      removePost={removePost}

                    />
                </div>


            })
        }
    </div>;
}

interface MyChildComponentProps {
    post: Post,
    removePost: (id: number) => void
}

function MyChildComponent({post, removePost,}: MyChildComponentProps) {


    return <div>the product is: {post?.title} <button onClick={() => removePost(post.id)}>delete this stuff</button></div>

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