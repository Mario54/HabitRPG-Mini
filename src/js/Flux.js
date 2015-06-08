var Flux = require('flummox').Flux;
import TaskActions from './TaskActions';
var TaskStore = require('./TaskStore');

class AppFlux extends Flux {

    constructor() {
        super();

        this.createActions('tasks', TaskActions);
        this.createStore('tasks', TaskStore, this);
    }

}

export default AppFlux;
