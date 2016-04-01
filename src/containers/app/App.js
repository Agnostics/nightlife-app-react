import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
// import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';

import { logout, login } from '../../actions/auth';
import './app.scss';

class App extends Component {

displayName() {
console.log(this.props.user.name);
}
	constructor(props) {
	    super(props);
		this.props.dispatch(login());
	  }

  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
    this.context.router.replace('/login');
  }


  render() {
    const { user } = this.props;
    return (
      <div>
        {/* <Header location={this.props.location} user={user} handleLogout={() => this.handleLogout()} /> */}
	<button onClick={this.displayName.bind(this)}>CLICK</button>
<div className="appContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null,
  };
};

export default connect(
  mapStateToProps
)(App);
