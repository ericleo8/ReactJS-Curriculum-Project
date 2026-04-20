import { useContext } from "react";
import { FavoriteContext } from "./context/FavoriteContext";
import MovieCard from "./ui/MovieCard";

function Favorites() {

    const { favorites } = useContext(FavoriteContext);

    return (
        <div>
            <h2>❤️ Favorites: {favorites.length}</h2>
            <h2>⭐ My Favorite Movies</h2>

            {favorites.length === 0 ? (
                <p>No favorite movies yet</p>
            ) : (
                <div className="movie-grid">
                    {favorites.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                    <p className="empty">
                        You haven't added any favorite movies yet 🎬
                    </p>
                </div>
            )}

        </div>
    );
}

export default Favorites;