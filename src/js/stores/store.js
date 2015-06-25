import * as constants from "../constants";
var assign = require("object-assign");

const initialState = {
  user: {}
};

const actionsMap = {
  [constants.FETCH_USER]: (state, action) => ({user: action.user})
};

export default function store(state = initialState, action) {
  const reducer = actionsMap[action.type];
  if (!reducer) {
    return state;
  }
  console.log(reducer(state, action));
  return assign({}, state, reducer(state, action));
}
