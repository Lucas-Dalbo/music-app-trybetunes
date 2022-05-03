import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      almbumData: '',
      almbumTracks: [],
    };
    this.fetchAlbum = this.fetchAlbum.bind(this);
  }

  componentDidMount() {
    this.fetchAlbum();
  }

  async fetchAlbum() {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      almbumData: result[0],
      almbumTracks: result.slice(1),
    });
  }

  render() {
    const { almbumData, almbumTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main className="music-main">
          <div className="music-box">
            { almbumData && (
              <div className="info-box">
                <img src={ almbumData.artworkUrl100 } alt={ almbumData.collectionName } />
                <h3 data-testid="artist-name">{ almbumData.artistName }</h3>
                <h2 data-testid="album-name">{ almbumData.collectionName }</h2>
              </div>)}
            <MusicCard tracks={ almbumTracks } />
          </div>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
