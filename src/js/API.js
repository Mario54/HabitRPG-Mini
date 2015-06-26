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
    },

    loadUserInfo(cb) {
      user.getUser(function(error, response) {
        var responseJS = JSON.parse(response.text);
        var info = responseJS.stats;

        info.name = responseJS.profile.name;
        cb(info);
      });
    }
  };
}

export default createAPI;
