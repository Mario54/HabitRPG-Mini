import * as constants from "./constants";
var api = require("habitrpg-api");
var Immutable = require("immutable");
import uuid from "uuid";

var user;

function createFeedback(dispatch, { delay, message, type }) {
  var id = uuid.v4();

  var promise = new Promise(function (resolve) {
    setTimeout(function() {
      resolve();
    }, delay);
  });

  dispatch({
    type: constants.SHOW_FEEDBACK,
    feedbackType: type,
    id,
    message
  });

  promise.then(function() {
    dispatch({
      type: constants.REMOVE_FEEDBACK,
      id
    });
  });

  return promise;
}

export function fetchUser(options) {
  const { id, token } = options;
  user = new api(id, token);

  return dispatch => {
    if (id && token) {
        chrome.storage.local.get(["user", "tasks"], function ({user, tasks}) {
          if (!user || !tasks) {
            return;
          }

          dispatch({
              type: constants.FETCH_USER,
              tasks: Immutable.fromJS(JSON.parse(tasks)),
              user: JSON.parse(user),
          });
        });
    }

    if (!id || !token || !user) {
      dispatch({
        type: constants.SHOW_FEEDBACK,
        feedbackType: "error",
        id: uuid.v4(),
        message: "There was a problem login in. Are you sure you have entered your credentials in the options page?"
      });
      return;
    }

    user.getUser(function(error, response) {
      if (error) {
        dispatch({
          type: constants.SHOW_FEEDBACK,
          feedbackType: "error",
          id: uuid.v4(),
          message: "There was a problem login in. Are you sure you have entered your credentials in the options page?"
        });
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

      // save the information in localstorage, for later use
      chrome.storage.local.set({
          user: JSON.stringify(info),
          tasks: JSON.stringify(tasks)
      });

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
      createFeedback(dispatch, {
        delay: 3000,
        message: "Updated " + task.get("text"),
        type: "success"
      });
      return message;
    }, function () {
      dispatch({
        type: constants.UPDATE_TASK_SCORE_ERROR,
        task,
        direction
      });
    });
  };
}

export function showFeedback({ delay, message, type}) {
  return dispatch => {
    createFeedback(dispatch, { delay, message, type });
  };
}

export function dismissFeedback(id) {
  return {
    type: constants.REMOVE_FEEDBACK,
    id
  };
}

export function switchTab(newTabIndex) {
    return {
        type: constants.SWITCH_TAB,
        tabIndex: newTabIndex
    };
}
