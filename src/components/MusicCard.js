import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favList: [],
    };
    this.onSaveFav = this.onSaveFav.bind(this);
    this.fetchFavs = this.fetchFavs.bind(this);
  }

  componentDidMount() {
    this.fetchFavs();
  }

  onSaveFav({ target }) {
    const { value, checked } = target;
    const trueValue = JSON.parse(value);
    this.setState((
      { loading: true }
    ), async () => {
      if (checked === true) await addSong(trueValue);
      if (checked === false) await removeSong(trueValue);
      this.setState({ loading: false });
    });
    this.fetchFavs();
  }

  async fetchFavs() {
    this.setState({ loading: true }, async () => {
      const fav = await getFavoriteSongs();
      this.setState({ loading: false, favList: fav });
    });
  }

  render() {
    const { tracks, onClick } = this.props;
    const { loading, favList } = this.state;
    return (
      <ul className="tracks-box">
        {
          loading && <Loading />
        }
        {
          tracks.map((el) => (
            <li key={ el.trackId } className="tracks">
              <div className="track-info">
                <p>{ ` ${el.trackName}` }</p>
                <label htmlFor={ el.trackName }>
                  <input
                    id={ el.trackName }
                    type="checkbox"
                    checked={
                      favList.some((some) => some.trackId === el.trackId)
                    }
                    value={ JSON.stringify(el) }
                    onChange={ this.onSaveFav }
                    onClick={ onClick }
                    data-testid={ `checkbox-music-${el.trackId}` }
                  />
                  Favorita
                </label>
              </div>
              <audio
                src={ el.previewUrl }
                data-testid="audio-component"
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento audio.
              </audio>
            </li>
          ))
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func,
};

MusicCard.defaultProps = {
  onClick: undefined,
};

export default MusicCard;
