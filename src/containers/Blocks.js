import React, { Component } from "react";
import Block from "../components/Block";

export default class Blocks extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <div className="block-list">
        {blocks.map((block) => {
          return <Block key={block.id} {...block} />;
        })}
      </div>
    );
  }
}
