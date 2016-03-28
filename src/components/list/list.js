import React, { Component, PropTypes } from 'react';
import './list.scss'

class List extends Component {
	constructor() {
	    super();
	    this.state = { hover: false }
	    this.handleHover = this.handleHover.bind(this);
	}

	handleHover() {
		this.setState({ hover: !this.state.hover });
	}

  render() {
    return (
    <div className="list-item">
		<div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className="card">
			<img src="src\components\list\o.jpg" />
			<div className="title">Hudson Blue Bar & View</div>
			{this.props.render && <div className="going">+2</div>}
			{this.state.hover && <div className="add">+</div>}
		</div>
	</div>

    );

  }
}
  List.propTypes = {
    render: PropTypes.bool,
  };

export default List;
