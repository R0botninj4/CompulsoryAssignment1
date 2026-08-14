import {APITester} from "./APITester";
// @ts-ignore
import "./index.css";
import {createBrowserRouter, type RouteObject, RouterProvider} from "react-router-dom";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import {Home} from "@/Home.tsx";

import { ListPosts } from "./Posts.tsx";

const myRoutes: RouteObject[] = [
    { path: "/", element: <Home /> },
    { path: "/register", element: <APITester /> },
    { path: "/posts", element: <ListPosts /> },
]

export function App() {

    return <RouterProvider router={createBrowserRouter(myRoutes)} />

    return (
        <div className="app">
            <div className="logo-container">
                <img src={logo} alt="Bun Logo" className="logo bun-logo" />
                <img src={reactLogo} alt="React Logo" className="logo react-logo" />
            </div>

            <h1>Bun + React</h1>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <APITester />
        </div>
    );
}

export default App;
