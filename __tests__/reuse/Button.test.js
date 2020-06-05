import "react-native";
import React, {useState} from "react";

import Button from "reuse/Button.js";

import renderer from "react-test-renderer";

describe( "ComponentTest", () => {
  it("Should Render correctly", () => {
    let ButtonRender = renderer.create(<Button />).toJSON();
    expect(ButtonRender).toMatchSnapshot();
  });

  it("Should Render correctly when disabled is true", () => {
    let ButtonRender = renderer.create(<Button disabled />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when primary is true", () => {
    let ButtonRender = renderer.create(<Button primary />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when secondary is true", () => {
    let ButtonRender = renderer.create(<Button secondary />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when success is true", () => {
    let ButtonRender = renderer.create(<Button success />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when danger is true", () => {
    let ButtonRender = renderer.create(<Button danger />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when warning is true", () => {
    let ButtonRender = renderer.create(<Button warning />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when info is true", () => {
    let ButtonRender = renderer.create(<Button info />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render correctly when styles are given", () => {
    let ButtonRender = renderer.create(<Button style={{ padding: 20 }} />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON).toMatchSnapshot();
  });

  it("Should Render with 1 child", () => {
    let ButtonRender = renderer.create(<Button />);
    let ButtonJSON =  ButtonRender.toJSON();
    expect(ButtonJSON.children.length).toBe(1);
  });

});
