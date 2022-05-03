import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.callUser = this.callUser.bind(this);
  }

  componentDidMount() {
    this.callUser();
  }

  async callUser() {
    const user = await getUser();
    const { name, email, image, description } = await user;
    this.setState({
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-title">
          <h3>Profile</h3>
        </div>
        <div className="profile-box">
          <div className="profile">
            <div className="pp-box">
              <img src={ image } alt={ name } data-testid="profile-image" />
            </div>
            <hr />
            <div className="profile-info">
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
            </div>
            <hr />
            <Link to="/profile/edit" className="go-edit">Editar perfil</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
