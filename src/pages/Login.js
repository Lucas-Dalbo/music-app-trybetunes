import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

class Login extends React.Component {
  render() {
    const { loginName, loginBtnDisable, onChange, onClick } = this.props;
    return (
      <div data-testid="page-login" className="login-box">
        <h1>TrybeTunes</h1>
        <form className="login" onSubmit={ onClick }>
          <h4>Digite seu nome</h4>
          <input
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ onChange }
            data-testid="login-name-input"
          />
          <button
            type="button"
            disabled={ loginBtnDisable }
            data-testid="login-submit-button"
            onClick={ onClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  loginBtnDisable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Login;
