import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    checked: true,
    loading: true,
  };

  componentDidMount() {
    getFavoriteSongs()
      .then((favorite) => this.setState({
        favoriteSongs: favorite,
        loading: false,
      }));
  }

  updateFavorites = async () => {
    this.setState({
      loading: true,
    });
    const teste = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: teste,
    });
  };

  render() {
    const { favoriteSongs, checked, loading } = this.state;
    return (
      <div
        data-testid="page-favorites"
      >
        Favorites
        {loading ? <Loading /> : (
          favoriteSongs.map((music, index) => (
            <MusicCard
              key={ index }
              checked={ checked }
              updateFavorites={ this.updateFavorites }
              { ...music }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
