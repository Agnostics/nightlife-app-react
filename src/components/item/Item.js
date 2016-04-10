import React, { Component, PropTypes } from 'react';
import './item.scss';

import { fetchAttend, fetchYelp } from '../../actions/yelp';

  class Item extends Component {
  	constructor() {
  	    super();

		const going = 0;

  	    this.state = { hover: false, going }
  	    this.handleHover = this.handleHover.bind(this);
		this.largeImage = this.largeImage.bind(this);
		this.handleClick = this.handleClick.bind(this);
  	}

	handleHover() {
		this.setState({ hover: !this.state.hover });
	}

	handleClick(location, id, name) {
		if (this.props.business.going.indexOf(name) < 0) {
			this.setState({ going: this.props.business.going.length++ })
			if (!this.props.user) {
			console.log('you must login FOOL');
			} else {
				this.props.dispatch(fetchAttend(location, id, name));
				// this.props.dispatch(fetchYelp(location));
			}
		} else {
			console.log('You already did this');
		}
	}

	largeImage(url) {
		const str = url.split('/');
		str[5] = 'o.jpg';
		const newStr = str.join('/');
		return newStr;
	}

    render() {
		const business = this.props.business;
      return (
		  <div className="list-item">
  		  <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className="card">
  			  <img src={this.largeImage(business.image_url)} />
  			  <div className="title">{business.name}</div>
  			  {this.props.render && this.props.business.going.length > 0 && <div className="going">{this.props.business.going.length }</div>}
  			  {this.state.hover && <div onClick={() => this.handleClick(this.props.input, this.props.business.id, this.props.user.displayName)} className="add">+</div>}
  		  </div>
  	  </div>

      );
    }
  }

  Item.propTypes = {
    render: PropTypes.bool,
    business: PropTypes.object,
	user: PropTypes.object,
	dispatch: PropTypes.func.isRequired,
	input: PropTypes.string,
  };

export default Item;
