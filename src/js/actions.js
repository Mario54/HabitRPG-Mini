import * as constants from "./constants";
var api = require("habitrpg-api");

export function fetchUser(options) {
  const { id, token } = options;

  return dispatch => {
    if (!id || !token) {
      return;
    }

    let user = new api(id, token);
    user.getUser(function(error, response) {
      if (error) return;

      var responseJS = JSON.parse(response.text);
      var info = responseJS.stats;

      info.name = responseJS.profile.name;

      dispatch({
        type: constants.FETCH_USER,
        user: info
      });
    });
  };
}
