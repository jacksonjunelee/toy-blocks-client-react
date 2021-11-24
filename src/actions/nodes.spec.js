import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { node_name: "Secret Lowlands" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("add blocks on success", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({
            id: "5",
            type: "blocks",
            attributes: {
              index: 1,
              timestamp: 1530679678,
              data: "The Human Torch",
            },
          });
        },
      })
    );
    await ActionCreators.addBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.ADD_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.ADD_BLOCK_SUCCESS,
        node,
        res: {
          id: "5",
          type: "blocks",
          attributes: {
            index: 1,
            timestamp: 1530679678,
            data: "The Human Torch",
          },
        },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the blocks on fail status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.addBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.ADD_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.ADD_BLOCK_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
