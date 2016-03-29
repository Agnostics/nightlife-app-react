import React, { Component, PropTypes } from 'react';
import './item.scss'

  class Item extends Component {
  	constructor() {
  	    super();
  	    this.state = { hover: false }
  	    this.handleHover = this.handleHover.bind(this);
		this.largeImage = this.largeImage.bind(this);
  	}

	handleHover() {
		this.setState({ hover: !this.state.hover });
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
  			  {this.props.render && <div className="going">+2</div>}
  			  {this.state.hover && <div className="add">+</div>}
  		  </div>
  	  </div>

      );
    }
  }

  Item.propTypes = {
    render: PropTypes.bool,
    business: PropTypes.object,
  };

export default Item;
