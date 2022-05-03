import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    const { user } = this.state;
    if (user.length === 0) this.setUser();
  }

  async setUser() {
    const data = await getUser();
    this.setState({
      user: data.name,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component" className="header-box">
        <div className="header">
          <h1>TrybeTunes</h1>
          <div className="name-box">
            { user.length === 0
              ? <Loading />
              : <p data-testid="header-user-name">{user}</p> }
          </div>
        </div>
        <nav className="nav-box">
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
