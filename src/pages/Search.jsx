import React, { Component } from 'react';

class Search extends Component {
  state = {
    buttonSubmit: true,
    searchField: '',
  };

  handleClick = ({ target: { value } }) => {
    if (value.length >= '2') {
      this.setState({
        buttonSubmit: false,
      });
    }
    this.setState({
      searchField: value,
    });
  };

  render() {
    const { searchField, buttonSubmit } = this.state;
    return (
      <div data-testid="page-search">
        <span>Search</span>
        <input
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          value={ searchField }
          onChange={ this.handleClick }
        />
        <button
          data-testid="search-artist-button"
          disabled={ buttonSubmit }
          // onClick={}
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
