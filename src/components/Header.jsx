import React, { Component } from 'react';
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
      </header>

    );
  }
}

export default Header;
