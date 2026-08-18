import { Outlet, useLocation } from "react-router-dom";
import logo from "./logo.svg";

export function Layout() {
    const location = useLocation();
    const isFeedPage = location.pathname === "/posts";

    return (
        <div className="app-shell">
            <aside className="sidebar-left">
                {isFeedPage && (
                    <>
                        <img src={logo} alt="Logo" className="sidebar-logo" />
                        <button>Create post</button>
                    </>
                )}
            </aside>

            <main className="feed-column">
                <Outlet />
            </main>

            <aside className="sidebar-right">
            </aside>
        </div>
    );
}