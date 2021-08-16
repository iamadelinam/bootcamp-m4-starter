import React, { Component } from "react";
import "./MovieItem.css";

class MovieItem extends Component {
  addToFavourites = () => {};
  render() {
    const { title, year, poster, onClick } = this.props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={poster} alt={title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {title} ({year})
          </h3>
          <button
            type="button"
            className="movie-item__add-button"
            onClick={onClick}
          >
            Добавить в список
          </button>
        </div>
      </article>
    );
  }
}

export default MovieItem;
