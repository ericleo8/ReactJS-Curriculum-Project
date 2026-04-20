import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetail() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "f63b318c";

    useEffect(() => {
        fetchDetail();
    }, [id]);

    async function fetchDetail() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
            );

            const data = await res.json();

            if (data.Response === "False") {
                setError(data.Error);
            } else {
                setMovie(data);
            }

        } catch (err) {
            setError("Failed to fetch movie detail");
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!movie) return null;

    return (
        <div className="detail-container">

            <Link to="/">⬅ Back</Link>

            <div className="detail-card">
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://cdn-icons-png.flaticon.com/512/813/813728.png"
                    }
                    alt={movie.Title}
                />


                <div className="detail-info">
                    <h2>{movie.Title}</h2>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    {/* 🧪 Mini Task 1 */}
                    <p><strong>Director:</strong> {movie.Director}</p>
                    {/* 🧪 Mini Task 2 */}
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>IMDB:</strong> ⭐ {movie.imdbRating}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                </div>
            </div>

        </div>
    );
}

export default MovieDetail;



// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// function MovieDetail() {
//     const { id, title } = useParams();
//     return (
//         <div>
//             <Link to="/">⬅ Back</Link>
//             <h2>Movie Detail Page</h2>
//             <h3>Movie ID: {id}</h3>
//             {/* 🧩 Mini Challenge */}
//             <h3>Movie Title: {decodeURIComponent(title)}</h3>
//         </div>
//     );
// }

// export default MovieDetail;
