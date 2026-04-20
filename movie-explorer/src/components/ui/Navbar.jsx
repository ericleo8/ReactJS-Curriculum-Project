import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {

    const { favorites } = useContext(FavoriteContext);
    const { toggleTheme, theme } = useContext(ThemeContext);

    return (
        <nav className="navbar">

            <h2>🎬 Movie App</h2>

            <div className="nav-links">
                {/* <Link to="/">Home</Link> */}
                <button onClick={toggleTheme}>
                    {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                </button>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Favorites ({favorites.length})
                </NavLink>
            </div>

        </nav>
    );
}

export default Navbar;