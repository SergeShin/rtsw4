import * as React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

test("check", () => {
	const element = shallow(<Button>Sample Button</Button>);

	expect(element.text()).toEqual("Sample Button");

	expect(element.find("button").hasClass("red")).toEqual(true);

	element.find("button").simulate("click");

	expect(element.find("button").hasClass("green")).toEqual(true);

	expect(shallow).toMatchSnapshot();
});
