import React, { Component } from 'react';
import List from '../../components/list/list';
import $ from 'jquery';
import './home.scss';

const opts = {
  consumer_key: 'pKDofaOks8Le0ZNJwBOeHA',
  consumer_secret: 'YR3jx9DFMV9asjob8MV4LXpLJE0',
  token: 'kM_kDUnPoRKiuHKVQEu6oJ0i5f4Wy_SU',
  token_secret: 'iNVPVshM9kS9z5zDlIKFKfXsI6Y',
};

class Home extends Component {

	constructor() {
		super();
		this.state = { input: '', animate: true, render: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	fetchData() {
		console.log(process.env.CONSUMER_KEY);
	}

	handleChange(e) {
		this.setState({ input: e.target.value })
	}

	handleClick() {
	this.fetchData();
		const elem = document.getElementById('animate');
		if (this.state.animate) {
		    $(elem).animate({
		        marginTop: '-=17%',
		    }, 1000, () => {
			this.setState({ animate: false });
			const items = document.getElementById('items');
			$(items).fadeTo('slow', 1, () => {
					this.setState({ render: true })
				});
			});
		}
	}

  render() {
    return (
    <div className="home">
		<div className="contain">
			 <div id="animate" className="main-input">
				<h1>Nightlife App</h1>
				<input onChange={this.handleChange} placeholder="Enter location here" />
				<button onClick={this.handleClick}>Go</button>
			</div>
			{!this.state.animate && <div id="items" className="items">
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
				<List render={this.state.render} />
			</div>}
		</div>
	</div>

    );
  }
}

export default Home;
