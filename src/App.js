import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './pages/Loading';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      loginName: '',
      loginBtnDisable: true,
      loader: false,
    };
    this.generalHandler = this.generalHandler.bind(this);
    this.btnHandler = this.btnHandler.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillUnmount() {
    this.setState({ loggedIn: true });
  }

  onLogin(e) {
    e.preventDefault();
    const { loginName } = this.state;
    this.setState({
      loader: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({ loader: false, loggedIn: true });
    });
  }

  btnHandler() {
    const { loginName } = this.state;
    const THREE = 3;
    this.setState({ loginBtnDisable: loginName.length < THREE });
  }

  generalHandler({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => this.btnHandler());
  }

  render() {
    const { loggedIn, loginName, loginBtnDisable, loader } = this.state;
    return (
      <main>
        { loader && <Loading /> }
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              loginName={ loginName }
              loginBtnDisable={ loginBtnDisable }
              onChange={ this.generalHandler }
              onClick={ this.onLogin }
            />) }
          >
            { loggedIn && <Redirect to="/search" /> }
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;
