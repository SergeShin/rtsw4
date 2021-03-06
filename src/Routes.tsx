import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";

export default () => (
	<Router>
		<div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>

			<hr />

			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
		</div>
	</Router>
);
