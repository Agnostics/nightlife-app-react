import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { user } = this.props;
    return (
        <nav>
        	<IndexLink to="/">Home</IndexLink>
            <li title="About" ><Link to="/about">About Us</Link></li>
			<li><a href="#">{user || 'Register'}</a></li>
            <li><a href="#" onClick={ event => this.onLogoutClick(event)}>{user ? 'Logout' : 'Login'}</a></li>
        </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};
