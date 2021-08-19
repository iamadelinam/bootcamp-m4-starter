import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const postRequest = (title, favorites)  => {
  return fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
    body: JSON.stringify({
      title: title,
      movies: favorites.map((movie) => movie.imdbID),
    }),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  }).then((response) => response.json());
};

class Favorites extends Component {
  state = {
    title: "Новый список",
    id: null,
  };

  handlerOnChange = (event) => {
    this.setState({ title: event.target.value });
  };

  saveList = () => {
    this.props.favorites.map((movie) => movie.imdbID);
    postRequest(this.state.title, this.props.favorites).then((list) => {
      this.setState({
        id: list.id,
      });
    });
  };
  render() {
    return (
      <div className="favorites">
        <input
          value={this.state.title}
          className="favorites__name"
          onChange={this.handlerOnChange}
          disabled={this.state.id}
        />
        <ul list={this.state.list} className="favorites__list">
          {this.props.favorites.map((item, index) => {
            return (
              <li className="favorites__item" key={item.imdbID}>
                {item.Title} ({item.Year})
                <button className='delete' onClick={() => this.props.deteleItem(index)}>X</button>
              </li>
            );
          })}
        </ul>
        {this.state.id ? (
          <Link to={`/list/${this.state.id}`}>Посмотреть список</Link>
        ) : (
          <button
            type="button"
            className="favorites__save"
            onClick={this.saveList}
            disabled={!this.state.title}
          >
            Сохранить список
          </button>
        )}
      </div>
    );
  }
}

export default Favorites;
