import React, { Component, PropTypes } from 'react';
import Item from '../../components/item/Item';

class List extends Component {
  render() {
    return (
		<div>
			{this.props.data.map((business, index) => {
				if (index < 15) {
			    return <Item dispatch={this.props.dispatch} input={this.props.input} user={this.props.user} key={business.id} render={this.props.render} business={business} />;
				}
				return ''
			})}
		</div>

    );
  }

}
  List.propTypes = {
    render: PropTypes.bool,
	data: PropTypes.array,
	user: PropTypes.object,
	input: PropTypes.string,
	dispatch: PropTypes.func,
  };

export default List;
