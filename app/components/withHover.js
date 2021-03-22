import React from 'react';

export default function withHover(Component, propName='hovering') {
	return class WithHover extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				[propName]: false,
			};
			this.mouseOver = () => this.setState({[propName]: true})
			this.mouseOut = () => this.setState({[propName]: false})
		}

		render() {

			// this is to prevent naming collision---what if the WithHover component was passed another prop like hovering=10?
			// now you just have to enter whatever propName, go to Tooltip and change "hovering" to the propName
			const props = {
				[propName]: this.state.hovering,
				...this.props
			}
			return (
				<div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
					<Component {...props}/>
				</div>
			);
		}
	};
}
