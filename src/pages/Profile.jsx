import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
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

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div>
        <div data-testid="page-profile">Profile</div>
        <span>
          {loading ? <Loading /> : (
            <div>
              <h1>{ name }</h1>
              <p>{ email }</p>
              <p>{ description }</p>
              <img src={ image } alt="Imagem de perfil" data-testid="profile-image" />
            </div>
          )}
        </span>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
