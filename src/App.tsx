import {APITester} from "./APITester";
// @ts-ignore
import "./index.css";
import {createBrowserRouter, type RouteObject, RouterProvider} from "react-router-dom";

import reactLogo from "./react.svg";
import {Home} from "@/Home.tsx";
import { Layout } from "./Layout";
import { PostDetail } from "./PostDetail.tsx";
import { ListPosts } from "./Posts.tsx";

const myRoutes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <APITester /> },
            { path: "/posts", element: <ListPosts /> },
            { path: "/posts/:id", element: <PostDetail /> },
        ],
    },
]

export function App() {

    return <RouterProvider router={createBrowserRouter(myRoutes)} />
}

export default App;
