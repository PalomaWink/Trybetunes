import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
  };

  // chamar o handleMusicChange dentro do didMound
  // salvar o retorno dentro do estado e o estado eu consigo dar um map

  componentDidMount() {
    this.handleMusicChange();
  }

  handleMusicChange = async () => {
    const { match: { params: { id } } } = this.props;
    const musicAPI = await getMusics(id);
    this.setState({
      loading: false,
      musics: musicAPI,
    });
  };

  render() {
    const { loading, musics } = this.state;
    const uniqueMusics = musics
      .filter((music, index, self) => index === self.findIndex((m) => (
        m.artistName === music.artistName && m.collectionName === music.collectionName
      )));
    return (
      <div data-testid="page-album">
        {loading ? <Loading /> : (
          uniqueMusics.map((music) => (
            <div key={ `${music.trackId}` }>
              <p data-testid="artist-name">{music.artistName}</p>
              <p data-testid="album-name">{music.collectionName}</p>
              {musics.filter((m) => (
                m.artistName === music.artistName
                && m.collectionName === music.collectionName
              )).slice(1).map((musicName) => (
                <MusicCard
                  key={ musicName.trackId }
                  trackName={ musicName.trackName }
                  previewUrl={ musicName.previewUrl }
                  trackId={ musicName.trackId }
                />
              ))}
            </div>
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
