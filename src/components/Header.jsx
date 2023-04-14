import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    loading: true,
    name: '',
  };

  componentDidMount() {
    getUser().then((user) => this.setState({
      ...user,
      loading: false,
    }));
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">
          {loading ? <Loading /> : name }
        </span>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>

    );
  }
}

export default Header;
