import * as React from "react";

import TodoApp from "./components/TodoApp";

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>App</h1>
				<TodoApp title="Text" />
			</div>
		);
	}
}

export default App;
