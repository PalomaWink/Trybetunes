import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: true,
    checked: false,
  };

  componentDidMount() {
    this.isFavorite();
  }

  handleFavoriteChange = async (event) => {
    const { trackId, previewUrl, trackName } = this.props;
    this.setState({
      loading: true,
    });
    if (event.target.checked === true) {
      await addSong({ trackId, previewUrl, trackName });
    } else {
      await removeSong({ trackId, previewUrl, trackName });
    }
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: favorites.some((musicId) => musicId.trackId === trackId),
    });
  };

  isFavorite = async () => {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      checked: favorites.some((musicId) => musicId.trackId === trackId),
    });
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <p>{ trackName }</p>
        {loading ? <Loading /> : (
          <div>
            <label htmlFor="favorites">Favorita</label>
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id="favorites"
              checked={ checked }
              onChange={ this.handleFavoriteChange }
            />
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
