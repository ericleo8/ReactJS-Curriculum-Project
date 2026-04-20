import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Container from "./components/ui/Container";
import { useContext } from "react";
import { FavoriteContext } from "./components/context/FavoriteContext";
import Favorites from "./components/Favorites";
import Navbar from "./components/ui/Navbar";
function App() {
  // const { favorites } = useContext(FavoriteContext);
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        {/* <h2>❤️ Favorites: {favorites.length}</h2> */}
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id/:title" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;