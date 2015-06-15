var Habitapi = require("habitrpg-api");

// TODO make this a flux store
var api;

function loadAllTasks(cb) {
  if (!api) {
    return;
  }

  api.getTasks(function(error, response) {
      if (error) {
          // TODO Display error message
          return;
      }

      var tasks = JSON.parse(response.text);
      cb(tasks);
  });
}

function updateTaskScore(id, direction, cb) {
  if (!api) {
    return;
  }

  api.updateTaskScore(id, direction, cb);
}

function login(userId, token) {
  api = new Habitapi(userId, token);
}

export default {
  login,
  loadAllTasks,
  updateTaskScore
};
