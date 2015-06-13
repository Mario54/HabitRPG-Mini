var Flux = require("flummox").Flux;

var TaskStore = require("./TaskStore");

function AppFluxFactory(api) {
    var TaskActions = require("./TaskActions")(api);

    return class AppFlux extends Flux {

        constructor() {
            super();

            this.createActions("tasks", TaskActions);
            this.createStore("tasks", TaskStore, this);
        }

    };

}

export default AppFluxFactory;
