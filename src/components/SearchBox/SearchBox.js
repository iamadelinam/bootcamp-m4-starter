import React, { Component } from "react";
import "./SearchBox.css";

class SearchBox extends Component {
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    const { searchLine, onChange, onClick } = this.props;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={onChange}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
            onClick={onClick}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
