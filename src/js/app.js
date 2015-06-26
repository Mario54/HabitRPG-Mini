/*global chrome */
var React = require("react");
var root = document.getElementById("content");
var options = require("./options");
var HabitRPG = require("./Components/HabitRPG")( {React, options } );
var FeedbackArea = require("./Components/FeedbackView");
import * as actions from "./actions";
import { bindActionCreators } from "redux";
import * as Actions from "./actions";

import { createRedux } from "redux";
import { Provider, Connector } from "redux/react";
import habitrpg from "./stores/habitrpg";
var stores = {
  habitrpg
};

const redux = createRedux(stores);

function selectFeedbacks(state) {
  return {feedbacks: state.habitrpg.feedbacks};
}
/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element, userOptions) {
  React.render(<Provider redux={redux}>
    {() => <Connector select={selectFeedbacks}>
      {({ feedbacks, dispatch }) =>
        <FeedbackArea feedbacks={feedbacks} {...bindActionCreators(Actions, dispatch)} />
      }
    </Connector>}
  </Provider>, document.getElementById("overlay"));

  React.render(
    <Provider redux={redux}>
        {() =>
          <HabitRPG options={userOptions} />
        }
    </Provider>, element);
}

renderApp(root);

if (chrome) {
  // once the user id and token are available, display the app
  options.fetch(chrome.storage, function ({id, token, showCompletedTasks }) {
    redux.dispatch(actions.fetchUser({id, token}));
  });
}
