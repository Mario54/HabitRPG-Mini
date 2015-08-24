/*global chrome */
var React = require("react");
var root = document.getElementById("content");
var options = require("./options");
var HabitRPG = require("./Components/HabitRPG");
var FeedbackArea = require("./Components/FeedbackView");
import * as actions from "./actions";
// import * as Actions from "./actions";
import { Provider } from "react-redux";
import habitrpg from "./stores/habitrpg";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = applyMiddleware(thunk)(createStore)(habitrpg);

/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element, userOptions) {
    // to display notifications
  React.render(
      <Provider store={store}>
        {() =>
            <FeedbackArea />
        }
      </Provider>, document.getElementById("overlay"));

  // the main application
  React.render(
    <Provider store={store}>
        {() =>
          <HabitRPG options={userOptions} />
        }
    </Provider>,
    element);
}

renderApp(root);

if (chrome) {
  // once the user id and token are available, display the app
  options.fetch(chrome.storage, function ({id, token, showCompletedTasks }) {
    store.dispatch(actions.fetchUser({id, token}));
  });
}
