import React, { Component } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";

class Movies extends Component {
  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie) => (
          <li className="movies__item" key={movie.imdbID}>
            <MovieItem
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
              onClick={() => this.props.onClick(movie)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
