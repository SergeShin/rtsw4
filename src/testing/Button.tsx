import * as React from "react";

import * as classNames from "classnames";

interface State {
	color: string;
}

class Button extends React.Component<{}, State> {
	state: State = {
		color: "red"
	};

	handleClick = () => {
		this.setState({
			color: this.state.color === "red" ? "green" : "red"
		});
	};

	render() {
		const color = this.state.color;
		return (
			<button
				className={classNames("ui", color, "button")}
				onClick={this.handleClick}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;
