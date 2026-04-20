import { Link } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import { useContext } from "react";
import { useFavorite } from "../hooks/useFavorite";
import { memo } from "react";
function MovieCard({ movie, showDetail = true }) {
    console.log("Render:", movie.Title);
    const {
        addFavorite,
        removeFavorite,
        isFavorite
    } = useFavorite();

    const favorite = isFavorite(movie.imdbID);

    function toggleFavorite() {
        if (favorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    }

    return (
        <div className="movie-card">
            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://cdn-icons-png.flaticon.com/512/813/813728.png"
                }
                alt={movie.Title}
            />

            <div className="movie-info">
                <h4>🅰 {movie.Title}</h4>
                <p>📆 {movie.Year}</p>
                <p>🎥 {movie.Type}</p>
                {/* <Link to={`/movie/${movie.imdbID}/${encodeURIComponent(movie.Title)}`}>
                    View Detail
                </Link> */}
                <button onClick={toggleFavorite}>
                    {favorite ? "💔 Remove" : "❤️ Favorite"}
                </button>
                {/* <Link to="/favorites">Go to Favorites</Link> */}
                {favorite && <p>Already in favorites</p>}
                {showDetail && (
                    <p>
                        <Link to={`/movie/${movie.imdbID}/${encodeURIComponent(movie.Title)}`}>
                            View Detail
                        </Link>
                    </p>
                )}
            </div>

        </div>
    );
}

export default memo(MovieCard);