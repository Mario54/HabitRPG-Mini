var Promise = require("promise");

const FeedbackActions = {
  showFeedback(id, type, message, delay) {
    // make a promise and resolve it after delay amount of ms
    return new Promise(function (resolve) {
      setTimeout(function() {
        resolve({id});
      }, delay);
    });
  },

  dismissFeedback(id) {
    return id;
  }
};

export default FeedbackActions;
