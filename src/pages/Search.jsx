import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    buttonSubmit: true,
    searchField: '',
    isLoading: undefined,
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

  handleSearchClick = async () => {
    const { searchField } = this.state;
    this.setState({
      isLoading: true,
      searchField: '',
    });
    const searchAlbum = await searchAlbumsAPI(searchField);
    console.log(searchAlbum);
    this.setState({
      isLoading: false,
      resultAlbuns: searchAlbum,
      title: `Resultado de álbuns de: ${searchField}`,
    });
    if (searchAlbum.length === 0) {
      this.setState({
        title: 'Nenhum álbum foi encontrado',
      });
    }
  };

  render() {
    const {
      searchField,
      buttonSubmit,
      isLoading,
      resultAlbuns,
      title,
    } = this.state;
    if (isLoading) return <Loading />;
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
          onClick={ this.handleSearchClick }
        >
          Pesquisar
        </button>
        {title}
        {(!isLoading && (
          resultAlbuns?.map((album) => (
            <div key={ album.collectionId }>
              <img
                src={ album.artworkUrl100 }
                alt="Imagem do album"
              />
              <p>{album.artistName}</p>
              <p>{album.collectionName}</p>
              <p>{album.releaseDate}</p>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Album
              </Link>
            </div>
          ))
        ))}
      </div>
    );
  }
}

export default Search;
