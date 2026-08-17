import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const login = () => {
        navigate("/register");
    };

    return (
        <div className="home-page">
            <button onClick={() => login()}>Login</button>
            ---- To see products
        </div>
    );
}