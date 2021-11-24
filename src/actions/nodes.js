import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const addBlockStart = (node) => {
  return {
    type: types.ADD_BLOCK_START,
    node,
  };
};

const addBlockSuccess = (node, res) => {
  return {
    type: types.ADD_BLOCK_SUCCESS,
    node,
    res,
  };
};

const addBlockFailure = (node) => {
  return {
    type: types.ADD_BLOCK_FAILURE,
    node,
  };
};

export function addBlocks(node) {
  return async (dispatch) => {
    try {
      dispatch(addBlockStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(addBlockFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(addBlockSuccess(node, json));
    } catch (err) {
      dispatch(addBlockFailure(node));
    }
  };
}

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}
