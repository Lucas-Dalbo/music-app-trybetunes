import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      lockSearchBtn: true,
      loading: false,
      didSearch: false,
      artistSearch: '',
      searchResult: [],
    };
    this.btnHandler = this.btnHandler.bind(this);
    this.generalHandler = this.generalHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(e) {
    e.preventDefault();
    const { search } = this.state;
    this.setState({ loading: true,
      artistSearch: search,
      search: '',
      lockSearchBtn: true }, async () => {
      const result = await searchAlbumsAPI(search);
      this.setState({ searchResult: result, didSearch: true, loading: false });
    });
  }

  btnHandler() {
    const { search } = this.state;
    const TWO = 2;
    this.setState({ lockSearchBtn: search.length < TWO });
  }

  generalHandler({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.btnHandler());
  }

  render() {
    const { search,
      lockSearchBtn, loading, didSearch, searchResult, artistSearch } = this.state;

    const form = () => (
      <form className="form-box" onSubmit={ this.onSearch }>
        <input
          type="text"
          name="search"
          value={ search }
          onChange={ this.generalHandler }
          data-testid="search-artist-input"
        />
        <button
          className="search-btn"
          type="button"
          disabled={ lockSearchBtn }
          onClick={ this.onSearch }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </form>
    );

    const result = () => (
      <div className="result-box">
        { searchResult.length === 0
          ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            <div className="result">
              <h3>{ `Resultado de álbuns de: ${artistSearch}` }</h3>
              <ul className="album-box">
                {searchResult.map((el) => (
                  <Link
                    className="album"
                    to={ `/album/${el.collectionId}` }
                    data-testid={ `link-to-album-${el.collectionId}` }
                    key={ el.collectionId }
                  >
                    <img src={ el.artworkUrl100 } alt={ el.collectionName } />
                    <p>{`${el.collectionName}`}</p>
                    <p><i>{`${el.artistName}`}</i></p>
                  </Link>
                ))}
              </ul>
            </div>
          )}
      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-box">
          <h3>Pesquisar</h3>
          { loading ? <Loading /> : form() }
          { didSearch && result() }
        </div>
      </div>
    );
  }
}

export default Search;
