import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { trackId,
      previewUrl,
      trackName,
      updateFavorites,
    } = this.props;
    this.setState({
      loading: true,
    });
    if (event.target.checked === true) {
      await addSong({ trackId, previewUrl, trackName });
    } else {
      await removeSong({ trackId, previewUrl, trackName });
    }
    updateFavorites();
    const favorites = await getFavoriteSongs();
    this.setState({
      checked: favorites.some((musicId) => musicId.trackId === trackId),
      loading: false,
    });
  };

  isFavorite = async () => {
    const { trackId } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      checked: favorites.some((musicId) => musicId.trackId === trackId),
      loading: false,
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
              onChange={ (e) => this
                .handleFavoriteChange(e) }
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
  updateFavorites: PropTypes.func,
};
MusicCard.defaultProps = {
  updateFavorites: () => {},
};

export default MusicCard;
