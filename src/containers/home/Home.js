import React, { Component } from 'react';
import List from '../../components/list/list';
import $ from 'jquery';
import './home.scss';


class Home extends Component {

	constructor() {
		super();
		this.state = { input: '', animate: true, render: false, data: [], user: [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	getUser() {
		$.ajax({
            url: '/auth/login',
            dataType: 'json',
            success: (user) => {
				console.log(user);
                this.setState({ user });
            },
            error: (err) => {
                console.error(`error: ${err}`);
            },
        });
	}

	fetchData() {
		$.ajax({
            url: `/yelp/${this.state.input}`,
            dataType: 'json',
            success: (data) => {
                this.setState({ data });
            },
            error: (err) => {
                console.error(`error: ${err}`);
            },
        });
	}

	handleChange(e) {
		this.setState({ input: e.target.value })
	}

	handleClick() {
	this.fetchData();
	this.getUser();
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
			<div>
				<div id="animate" className="main-input">
				   <h1>Nightlife App</h1>
				   <input onChange={this.handleChange} placeholder="Enter location here" />
				   <button onClick={this.handleClick}>Go</button>
			   </div>
			</div>

			{!this.state.animate && <div id="items" className="items">
				<List data={this.state.data.businesses} render={this.state.render} />

			</div>}
		</div>
	</div>

    );
  }
}

export default Home;
