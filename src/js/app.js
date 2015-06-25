/*global chrome */
var React = require("react");
var uuid = require("uuid");
var FluxComponent = require("flummox/component");
var FluxFactory = require("./Flux");
var apiFactory = require("./API");
var root = document.getElementById("content");
var options = require("./options");
var HabitRPG = require("./Components/HabitRPG")( {React, options } );
var FeedbackArea = require("./Components/FeedbackView");
import * as actions from "./actions";

import { createRedux } from "redux";
import { Provider } from "redux/react";
import store from "./stores/store";
var stores = {
  store
};

const redux = createRedux(stores);


var api = apiFactory();

// Flux
var flux = new (FluxFactory({api}))();

function subscribeEvents(fluxInstance) {
  var tasksStore = fluxInstance.getStore("tasks");

  tasksStore.on("error", function(message) {
    setTimeout(function () {
      fluxInstance.getActions("feedbacks").showFeedback(uuid.v4(), "error", message, 10000);
    }, 500);
  });

  tasksStore.on("task-updated", function () {
    setTimeout(function () {
      fluxInstance.getActions("feedbacks").showFeedback(uuid.v4(), "success", "Updated", 2000);
    }, 100);

    api.loadUserInfo(flux.getActions("user").loadUserInfo);
  });
}

/**
 * Renders the app given the user's id and the API token
 */
function renderApp(element, userOptions) {
  subscribeEvents(flux);

  if ( !api.isLoggedIn() ) {
    flux.getActions("feedbacks").showFeedback(uuid.v4(), "error", "You are not logged in. Enter your user information in the options page.", 500000);
  }

  React.render(<FluxComponent flux={flux} connectToStores={["feedbacks"]}><FeedbackArea /></FluxComponent>, document.getElementById("overlay"));
  React.render(<FluxComponent flux={flux}>
    <Provider redux={redux}>
        {() =>
          <HabitRPG options={userOptions} />
        }
    </Provider>
  </FluxComponent>, element);
}



if (chrome) {
  // once the user id and token are available, display the app
  options.fetch(chrome.storage, function ({id, token, showCompletedTasks }) {
    api.login(id, token);
    api.loadAllTasks(flux.getActions("tasks").loadAllTasks);
    // api.loadUserInfo(flux.getActions("user").loadUserInfo);
    redux.dispatch(actions.fetchUser({id, token}));
    renderApp(root, {showCompletedTasks});
  });
}
