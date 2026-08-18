import { Outlet, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import { useState, type Dispatch, type SetStateAction } from "react";

export interface LayoutContext {
    search: string;
    showCreatePost: boolean;
    setShowCreatePost: Dispatch<SetStateAction<boolean>>;
}


export function Layout() {
    const location = useLocation();
    const isFeedPage = location.pathname === "/posts";
    const [search, setSearch] = useState("");
    const [showCreatePost, setShowCreatePost] = useState(false);

    return (
        <div className="app-shell">
            <aside className="sidebar-left">
                {isFeedPage && (
                    <>
                        <img src={logo} alt="Logo" className="sidebar-logo" />
                        <button
                            className="create-post-button"
                            onClick={() => setShowCreatePost(true)}
                        >
                            Create post
                        </button>
                    </>
                )}
            </aside>

            <main className="feed-column">
                <Outlet context={{ search, showCreatePost, setShowCreatePost }} />
            </main>

            <aside className="sidebar-right">
                {isFeedPage && (
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                )}
            </aside>
        </div>
    );
}
