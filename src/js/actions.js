import * as constants from "./constants";
var api = require("habitrpg-api");
var Immutable = require("immutable");

var user;

export function fetchUser(options) {
  const { id, token } = options;
  user = new api(id, token);

  return dispatch => {
    if (!id || !token) {
      return;
    }

    user.getUser(function(error, response) {
      if (error) {
        return;
      }

      var responseJS = JSON.parse(response.text);
      var info = responseJS.stats;

      var tasks = {};
      responseJS.habits.forEach(function (habit) {
        tasks[habit.id] = habit;
      });
      responseJS.todos.forEach(function (todo) {
        tasks[todo.id] = todo;
      });
      responseJS.dailys.forEach(function (daily) {
        tasks[daily.id] = daily;
      });

      info.name = responseJS.profile.name;

      dispatch({
        type: constants.FETCH_USER,
        user: info,
        tasks: Immutable.fromJS(tasks)
      });
    });
  };
}

export function updateTaskScore(task, direction) {
  return dispatch => {
    var promise = new Promise(function (resolve, reject) {
      user.updateTaskScore(task.get("id"), direction, function(error, response) {
          // mutating = bad, use object assign?
          var message = response;
          message.task = task;
          message.direction = direction;

          // reject({task, direction});

          if (error) { reject(error); }
          else { resolve(message); }
      });
    });

    dispatch({
      type: constants.UPDATE_TASK_SCORE,
      task,
      direction
    });

    promise.then(function (message) {
      return message;
    }, function (error) {
      dispatch({
        type: constants.UPDATE_TASK_SCORE_ERROR,
        task,
        direction
      });
    });
  };
}