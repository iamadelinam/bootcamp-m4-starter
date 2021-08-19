import React from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Movies from "../../components/Movies/Movies";
import Favorites from "../../components/Favorites/Favorites";
import { useState } from "react";

const tokenN = "cc244bae";
const getMovies = (query) => {
  return fetch(`http://www.omdbapi.com/?s=${query}&apikey=${tokenN}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.Search;
    });
};

function MainPage() {
  const [searchLine, setSearchLine] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const searchLineChangeHandler = (e) => {
    setSearchLine(e.target.value);
  };

  const searchRequest = () => {
    getMovies(searchLine).then((data) => {
      setMovies(data);
    });
  };
  const addToFavourites = (movie) => {
    if (favorites.find(({ imdbID }) => imdbID === movie.imdbID)) {
      return;
    }

    let newFav = [...favorites, movie];
    setFavorites(newFav);
  };

  const deteleItem = (ind) => {
    let newFav = [...favorites];
    setFavorites(
      newFav.filter((movie, index) => {
        return index !== ind;
      })
    );
  };

  return (
    <div className="main-page">
      <Header />
      <main className="main-page__content">
        <section className="main-page__main-section">
          <div className="main-page__search-box">
            <SearchBox
              searchLine={searchLine}
              onChange={searchLineChangeHandler}
              onClick={searchRequest}
            />
          </div>
          <div className="main-page__movies">
            <Movies movies={movies} onClick={addToFavourites} />
          </div>
        </section>
        <aside className="main-page__favorites">
          <Favorites favorites={favorites} deteleItem={deteleItem} />
        </aside>
      </main>
    </div>
  );
}

export default MainPage;
