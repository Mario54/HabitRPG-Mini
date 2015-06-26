import * as constants from "../constants";
var assign = require("object-assign");
var Immutable = require("immutable");

const initialState = {
  user: {},
  tasks: Immutable.fromJS({})
};

const actionsMap = {
  [constants.FETCH_USER]: (state, action) => ({user: action.user, tasks: action.tasks}),
  [constants.UPDATE_TASK_SCORE]: (state, action) => {
    var { task, direction } = action;
    var id = task.get("id").toString();
    var updatedTask = state.tasks.get(id).set("completed", (direction === "up") ? true : false);

    return {tasks: state.tasks.set(id, updatedTask)};
  },
  [constants.UPDATE_TASK_SCORE_ERROR]: (state, action) => ({user: action.user, tasks: action.tasks})
};

export default function habitrpg(state = initialState, action) {
  const reducer = actionsMap[action.type];
  if (!reducer) {
    return state;
  }

  return assign({}, state, reducer(state, action));
}
