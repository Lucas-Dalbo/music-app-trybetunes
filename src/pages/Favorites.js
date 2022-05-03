import React from 'react';
import Header from './Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
      loading: false,
      dontHaveFav: true,
    };
    this.fetchFavorites = this.fetchFavorites.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  onClick({ target }) {
    const { value, checked } = target;
    const trueValue = JSON.parse(value);
    this.setState((
      { loading: true }
    ), async () => {
      if (checked === false) await removeSong(trueValue);
      this.setState({ loading: false });
    });
    this.fetchFavorites();
  }

  fetchFavorites() {
    this.setState({ loading: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({
        loading: false, favorites: result, dontHaveFav: (result.length === 0) });
    });
  }

  render() {
    const { favorites, loading, dontHaveFav } = this.state;
    const showFav = () => (
      favorites && (
        <div className="favorites">
          <MusicCard tracks={ favorites } onClick={ this.onClick } />
        </div>
      )

    );
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="fav-box">
          <h3>Favorites</h3>
          {loading ? <Loading /> : showFav()}
          {dontHaveFav && <h3>Sem músicas favoritas ainda!</h3>}
        </div>
      </div>
    );
  }
}

export default Favorites;
