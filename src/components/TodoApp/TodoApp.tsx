import * as React from "react";

interface Props {
	title: string;
}

class TodoApp extends React.Component<Props> {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

export default TodoApp;
