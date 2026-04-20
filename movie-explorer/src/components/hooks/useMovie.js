import { useEffect, useState } from "react";

export function useMovie(initialQuery = "") {

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState(initialQuery || localStorage.getItem("lastSearch"));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "f63b318c";

    // useEffect(() => {
    //     fetchMovies();
    // }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    async function fetchMovies() {
        if (query.trim() === "") return;

        try {
            setLoading(true);
            setError("");

            const res = await fetch(
                `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
            );

            const data = await res.json();

            const uniqueMovies = (data.Search || []).filter(
                (movie, index, self) =>
                    index === self.findIndex(m => m.imdbID === movie.imdbID)
            );
            setMovies(uniqueMovies);
            if (data.Response === "False") {
                setError(data.Error);
                setMovies([]);
            } else {
                setMovies(data.Search);
            }
            localStorage.setItem("lastSearch", query);

        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return {
        movies,
        query,
        setQuery,
        loading,
        error,
        fetchMovies
    };
}