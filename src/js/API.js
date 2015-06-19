var Habitapi = require("habitrpg-api");

function createAPI() {
  var user;

  return {
    isLoggedIn() {
      return user !== undefined;
    },

    login(userId, token) {
      if (userId !== "" && token !== "") {
        user = new Habitapi(userId, token);
      }
    },

    updateTaskScore(id, direction, cb) {
      user.updateTaskScore(id, direction, cb);
    },

    loadAllTasks(cb) {
      if (!user) {
        return;
      }

      user.getTasks(function(error, response) {
          if (error) {
              // TODO Display error message
              return;
          }

          var tasks = JSON.parse(response.text);
          cb(tasks);
      });
    }
  };
}

export default createAPI;
