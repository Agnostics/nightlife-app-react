import { Component, PropTypes } from 'react';

class RestrictPage extends Component {
  componentWillMount() {
    const { router } = this.context;
    // If this page is restricted, go to loginPage first.
    // (But pass on this page's path in order to redirect back upon login)
      const path = this.props.location.pathname;
      router.push(`/login?redirect=${path}`);
}

  render() {
    if (user) {
      return this.props.children;
    }

    return null;
  }
}

RestrictPage.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

RestrictPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
