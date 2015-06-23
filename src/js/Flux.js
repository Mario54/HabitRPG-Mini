var Flux = require("flummox").Flux;

var TaskStore = require("./TaskStore");
var FeedbackActions = require("./FeedbackActions");
var FeedbackStore = require("./FeedbackStore");
var UserStore = require("./UserStore");
var UserActions = require("./UserActions");

function AppFluxFactory({api}) {
    var TaskActions = require("./TaskActions")({api});

    return class AppFlux extends Flux {

        constructor() {
            super();

            this.createActions("tasks", TaskActions);
            this.createStore("tasks", TaskStore, this);

            this.createActions("feedbacks", FeedbackActions);
            this.createStore("feedbacks", FeedbackStore, this);

            this.createActions("user", UserActions);
            this.createStore("user", UserStore, this);
        }

    };
}

export default AppFluxFactory;
