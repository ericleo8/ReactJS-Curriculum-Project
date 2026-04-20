import { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {

    //   const [favorites, setFavorites] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    //   function addFavorite(movie) {
    //     setFavorites(prev => [...prev, movie]);
    //   }
    function addFavorite(movie) {
        setFavorites(prev => {
            if (prev.some(m => m.imdbID === movie.imdbID)) {
                return prev;
            }
            return [...prev, movie];
        });
    }

    function removeFavorite(id) {
        setFavorites(prev =>
            prev.filter(movie => movie.imdbID !== id)
        );
    }

    function isFavorite(id) {
        return favorites.some(movie => movie.imdbID === id);
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}