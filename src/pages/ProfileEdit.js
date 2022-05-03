import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      btnLock: true,
      btnClick: false,
    };
    this.callUser = this.callUser.bind(this);
    this.generalHandler = this.generalHandler.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.callUser();
  }

  onClick(e) {
    e.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await updateUser({ name, email, image, description });
      this.setState({ btnClick: true });
    });
  }

  btnHandler() {
    const { name, email, image, description } = this.state;
    const position = email.search('@') + 1;
    const subEmail = email.substring(position, email.length);
    if (
      name.length > 0
      && email.length > 0
      && email.includes('@')
      && subEmail.length > 0
      && description.length > 0
      && image.length > 0
    ) {
      this.setState({ btnLock: false });
    } else {
      this.setState({ btnLock: true });
    }
  }

  generalHandler({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.btnHandler());
  }

  async callUser() {
    const user = await getUser();
    const { name, email, image, description } = await user;
    this.setState({
      name,
      email,
      image,
      description,
    }, () => this.btnHandler());
  }

  render() {
    const { name, email, image, description, btnLock, btnClick, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading && <Loading />}
        {btnClick && <Redirect to="/profile" /> }
        <div className="edit-container">
          <h3>Profile Edit</h3>
          <form className="edit-form" onSubmit={ this.onClick }>
            <label htmlFor="name">
              <p>User</p>
              <input
                type="text"
                id="name"
                name="name"
                value={ name }
                onChange={ this.generalHandler }
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                id="email"
                name="email"
                value={ email }
                onChange={ this.generalHandler }
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="description">
              <p>Description</p>
              <textarea
                type="text"
                id="description"
                name="description"
                value={ description }
                onChange={ this.generalHandler }
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="image">
              <p>Profile Picture</p>
              <input
                type="text"
                id="image"
                name="image"
                value={ image }
                onChange={ this.generalHandler }
                data-testid="edit-input-image"
              />
            </label>
            <div>
              <button
                type="submit"
                onClick={ this.onClick }
                data-testid="edit-button-save"
                disabled={ btnLock }
              >
                Alterar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
