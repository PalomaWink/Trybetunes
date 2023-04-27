import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    inputName: '',
    email: '',
    description: '',
    image: '',
    loading: true,
    isSaveButtonDisable: true,
  };

  componentDidMount() {
    getUser().then((user) => this.setState({
      ...user,
      loading: false,
    }));
  }

  handleValidation = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    this.setState(({
      inputName,
      email,
      description,
      image,
    }) => {
      const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
      if (inputName.length > 0
        && email.length > 0 && emailValidation
        && description.length > 0
        && image.length > 0) {
        this.setState({
          isSaveButtonDisable: false,
        });
      }
    });
  };

  handleClick = async () => {
    const { inputName, email, description, image } = this.state;
    const { history } = this.props;
    // loading precisa ser true
    this.setState({
      loading: true,
    });

    updateUser({
      name: inputName,
      email,
      description,
      image,
    }).then(() => history.push('/profile'));
    // Preciso redirecionar para o profile
  };

  render() {
    const { inputName,
      email,
      description,
      image,
      loading,
      isSaveButtonDisable,
    } = this.state;
    return (
      <div>
        <div data-testid="page-profile-edit">ProfileEdit</div>
        {loading ? <Loading />
          : (
            <div>
              <input
                data-testid="edit-input-name"
                name="inputName"
                placeholder="Escreva seu nome"
                value={ inputName }
                onChange={ this.handleValidation }
              />
              <input
                type="email"
                name="email"
                data-testid="edit-input-email"
                placeholder="Escreva seu e-mail"
                value={ email }
                onChange={ this.handleValidation }
              />
              <textarea
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleValidation }
              />
              <input
                data-testid="edit-input-image"
                name="image"
                type="text"
                value={ image }
                onChange={ this.handleValidation }
              />
              <button
                data-testid="edit-button-save"
                disabled={ isSaveButtonDisable }
                onClick={ this.handleClick }
              >
                Salvar informações
              </button>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
