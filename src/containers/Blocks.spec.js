import React from "react";
import { shallow } from "enzyme";
import Blocks from './Blocks'
import Block from '../components/Block';

describe("<Blocks />", () => {
  const nodeA =  {
    url: 'https://thawing-springs-53971.herokuapp.com',
    online: false,
    name: 'Node 1',
    loading: false,
    blocks: [{
        id: "5",
        type: "blocks",
        attributes: {
          index: 1,
          timestamp: 1530679678,
          data: "The Human Torch",
        },
      }]
  }

  it("should contain <Block />", () => {
    const wrapper = shallow(
      <Blocks
        blocks={nodeA.blocks}
      />
    );

    expect(wrapper.find(Block).length).toEqual(1);
  });
});
