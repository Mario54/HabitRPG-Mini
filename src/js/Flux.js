var Flux = require("flummox").Flux;

var TaskStore = require("./TaskStore");

function AppFluxFactory(api, initialTasks) {
    var TaskActions = require("./TaskActions")(api);

    return class AppFlux extends Flux {

        constructor() {
            super();

            this.createActions("tasks", TaskActions);
            this.createStore("tasks", TaskStore, this, initialTasks);
        }

    };

}

export default AppFluxFactory;
