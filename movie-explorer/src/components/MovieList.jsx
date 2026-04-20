import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./ui/MovieCard";
import Button from "./ui/Button";
import { useMovie } from "./hooks/useMovie";

function MovieList() {

  const {
    movies,
    query,
    setQuery,
    loading,
    error,
    fetchMovies
  } = useMovie();

  return (
    <div>
      <h2>Movie List</h2>
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") fetchMovies();
        }}
      />
      <Button onClick={fetchMovies} className="primary">
        Search
      </Button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* <div>
        {movies.map(movie => (
          <div key={movie.imdbID}>
            <p>{movie.Title} || {movie.Year} || <Link to={`/movie/${movie.imdbID}/${encodeURIComponent(movie.Title)}`}>View Detail</Link>
            </p>

          </div>
        ))}
      </div> */}
      <div className="movie-grid">
        {movies.map(movie => (
          // <div key={movie.imdbID} className="movie-card">
          /* <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-info">
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}/${encodeURIComponent(movie.Title)}`}>
              View Detail
            </Link>
          </div> */

          // </div>

          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;