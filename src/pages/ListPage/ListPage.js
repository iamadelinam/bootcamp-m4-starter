import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ListPage.css";

const getFavourites = (listId) => {
  return fetch(`https://acb-api.algoritmika.org/api/movies/list/${listId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};

const tokenNG = "cc244bae";

const getMovieRepresentation = (movieId) => {
  return fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${tokenNG}`).then(
    (response) => response.json()
  );
};

class ListPage extends Component {
  state = {
    title: "",
    movies: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    getFavourites(id)
      .then((list) => {
        this.setState({
          title: list.title,
        });
        const moviesPromises = list.movies.map((movieId) => {
          return getMovieRepresentation(movieId);
        });
        return Promise.all(moviesPromises);
      })
      .then((movies) => {
        this.setState({
          movies: movies,
        });
      });
  }
  render() {
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.title}</h1>
        <ul>
          {this.state.movies.map((item) => {
            return (
              <li key={item.imdbID}>
                <a
                  href={`https://www.imdb.com/title/${item.imdbID}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.Title} ({item.Year})
                </a>
              </li>
            );
          })}
        </ul>
        <Link to="/">Домой</Link>
      </div>
    );
  }
}

export default ListPage;
