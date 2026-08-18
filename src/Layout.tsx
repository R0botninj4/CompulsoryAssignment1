import { Outlet, useLocation } from "react-router-dom";
import logo from "./Ylogo.png";
import { useState } from "react";


export function Layout() {
    const location = useLocation();
    const isFeedPage = location.pathname === "/posts";
    const [search, setSearch] = useState("");

    return (
        <div className="app-shell">
            <aside className="sidebar-left">
                {isFeedPage && (
                    <>
                        <img src={logo} alt="Logo" className="sidebar-logo" />
                        <button className="create-post-button">Create post</button>
                    </>
                )}
            </aside>

            <main className="feed-column">
                <Outlet context={{ search }} />
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