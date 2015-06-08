var Flux = require('flummox').Flux;

console.log(Flux);

class AppFlux extends Flux {

    constructor() {
        super();

        this.createActions('tasks', TaskActions);
        this.createStore('tasks', TaskStore, this);
    }

}

export default AppFlux;
