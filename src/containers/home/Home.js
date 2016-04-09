import React, { Component, PropTypes } from 'react';
import List from '../../components/list/list';
import $ from 'jquery';
import './home.scss';
import { connect } from 'react-redux';

import { fetchYelp } from '../../actions/yelp';


class Home extends Component {

	constructor(props) {
		super(props);
		this.state = { input: '', animate: true, render: false, user: [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	fetchData() {
		this.props.dispatch(fetchYelp(this.state.input));
	}

	handleChange(e) {
		this.setState({ input: e.target.value })
	}

	handleClick() {
	this.fetchData();
		const elem = document.getElementById('animate');
		if (this.state.animate) {
		    $(elem).animate({
				marginTop: '-=320',
		    }, 1000, () => {
			this.setState({ animate: false });
			const items = document.getElementById('items');
			$(items).fadeTo('slow', 1, () => {
					this.setState({ render: true })
				});
			});
		}
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	        this.handleClick();
	    }
	}
  render() {
const user = this.props.auth || '';
const yelp = this.props.yelp || '';

    return (
    <div className="home">
		<div className="contain">
			<div>
				<div id="animate" className="main-input">
				   <h1>Nightlife App</h1>
						<input onKeyPress={this.handleKeyPress} onSubmit={this.handleClick} onChange={this.handleChange} placeholder="Enter location here" />
					    <button onClick={this.handleClick}>Go</button>
			   </div>
			</div>

			{!user && <div>YOU MUST LOGIN FOOL</div>}

			{!this.state.animate && <div id="items" className="items">
				<List data={yelp.bars} render={this.state.render} />

			</div>}
		</div>
	</div>

    );
  }
}

Home.propTypes = {
  auth: PropTypes.object,
  yelp: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
 const { auth, yelp } = state;

return { auth: auth.user, yelp: yelp.data }
}

export default connect(mapStateToProps)(Home);
