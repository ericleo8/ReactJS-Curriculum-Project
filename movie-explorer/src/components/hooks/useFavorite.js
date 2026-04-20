import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";

export function useFavorite() {
  return useContext(FavoriteContext);
}