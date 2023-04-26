import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: true,
  };

  componentDidMount() {
    getUser().then((user) => this.setState({
      ...user,
      loading: false,
    }));
  }

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
    history.push('/profile');
  };

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div>
        <div data-testid="page-profile-edit">ProfileEdit</div>
        {loading ? <Loading />
          : (
            <div>
              <input
                type="text"
                data-testid="edit-input-name"
                placeholder="Escreva seu nome"
                value={ name }
              />
              <input
                type="email"
                data-testid="edit-input-email"
                placeholder="Escreva seu e-mail"
                value={ email }
              />
              <textarea
                data-testid="edit-input-description"
                value={ description }
              />
              
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
