import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
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

  handleValidation = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
    this.setState(({
      name,
      email,
      description,
      image,
    }) => {
      const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
      if (name.length > 0
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
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    // loading precisa ser true
    this.setState({
      loading: true,
    });

    updateUser({
      name,
      email,
      description,
      image,
    }).then(() => history.push('/profile'));
    // Preciso redirecionar para o profile
  };

  render() {
    const { name,
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
                type="text"
                name="name"
                placeholder="Escreva seu nome"
                value={ name }
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
                Editar perfil
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
