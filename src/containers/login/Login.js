import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      // logged in, let's show redirect if any, or show home
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/');
      }
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.dispatch(login(username.value, password.value));
    username.value = '';
    password.value = '';
  }

  render() {
    const { user, loginError } = this.props;
    return (
    	<div>
	    	<input type="text" ref="username" placeholder="Username (hint: admin)" required autoFocus />
	    	<input type="password" ref="password" placeholder="Password (hint: password)" required />
        	{!user && loginError &&
            	<div>
                    {loginError.message}. Hint: use admin/password to log in.
            	</div>
			}
                <button onClick={this.handleLogin}>Log in</button>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
