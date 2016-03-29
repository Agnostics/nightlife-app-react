import React, { Component, PropTypes } from 'react';
import Item from '../../components/item/item';

class List extends Component {
  render() {
	console.log(this.props.data);
    return (
		<div>
			{this.props.data.map((business) => {
			    return <Item key={business.id} render={this.props.render} business={business} />;
			})}
		</div>

    );
  }

}
  List.propTypes = {
    render: PropTypes.bool,
	data: PropTypes.array,
  };

export default List;
