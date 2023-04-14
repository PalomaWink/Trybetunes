import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    buttonSubmit: true,
    nameField: '',
    loading: false,
  };

  handleClick = async () => {
    const { nameField } = this.state;
    const { history } = this.props;
    // loading precisa ser true
    this.setState({
      loading: true,
    });

    await createUser({
      name: nameField,
    });
    // Preciso redirecionar para o search
    history.push('/search');
  };

  handleButtonChange = ({ target: { value } }) => {
    if (value.length >= '3') {
      this.setState({
        buttonSubmit: false,
      });
    }
    this.setState({
      nameField: value,
    });
  };

  render() {
    const { nameField, buttonSubmit, loading } = this.state;
    return (
      <div>
        <div data-testid="page-login">Login</div>
        {loading ? <Loading />
          : (
            <div>
              <input
                type="text"
                data-testid="login-name-input"
                placeholder="Escreva seu nome"
                value={ nameField }
                onChange={ this.handleButtonChange }
              />
              <button
                data-testid="login-submit-button"
                disabled={ buttonSubmit }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
