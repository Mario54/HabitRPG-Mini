import { Store } from 'flummox';
import Immutable from 'immutable';
import assign    from 'object-assign';
import uuid      from 'uuid';

function getDayString(day) {
    var days = {
        0: 'su',
        1: 'm',
        2: 't',
        3: 'w',
        4: 'th',
        5: 'f',
        6: 's'
    };

    return days[day];
}

class TaskStore extends Store {

    constructor(flux) {
        super();

        const taskActions = flux.getActions('tasks');
        this.register(taskActions.newTask, this.handleNewTask);
        this.register(taskActions.saveTask, this.handleSaveTask);
        this.register(taskActions.deleteTask, this.handleDeleteTask);
        this.register(taskActions.loadAllTasks, this.handleLoadAllTasks);

        this.state = {};
    }

    getTasks() {
        return this.state.tasks;
    }

    /**
     * Returns all the tasks that are active today.
     */
    getTodaysTasks() {
        if ( ! this.state.tasks) {
            return;
        }

        return this.state.tasks.filter((task) => {
            var type = task.get('type');

            if (type === 'daily') {
                var currentDay = getDayString((new Date()).getDay());
                if (task.get('repeat').get(currentDay)) {
                    return true;
                }

                return false;
            } else if (type === 'todo') {
                if ( ! task.get('completed')) {
                    return true;
                }

                return false;
            }

            return true;
        });
    }

    /**
     * Creates a new task in the store. If the task has no id, then it is set
     * automatically by this method.
     */
    handleNewTask(content) {
        var todo = Immutable.fromJS(assign({}, content, { id: uuid.v4() }));

        this.setState({
            tasks: this.state.tasks.set(todo.get('id'), todo)
        });
    }

    /**
     * Saves the task in the state of the Store. If the task has no id, it will be
     * generated.
     */
    handleSaveTask(task) {
        // console.log(this.state.tasks.get(task.get('id').toString()));
        console.log(this.state.tasks.toJS());
        var tasks = this.state.tasks.set(task.get('id').toString(), task);
        this.setState({
            tasks
        });
    }

    /**
     * Deletes the task from the store. If the id is not set, nothing will change in the store.
     */
    handleDeleteTask(task) {
        this.setState({
            tasks: this.state.tasks.delete(task.get('id'))
        })
    }

    /**
     * Overwrites all the tasks in the applications with the ones sent in.
     */
    handleLoadAllTasks(tasks) {
        // converts the array of tasks to a HashMap
        var tasksMap = {};
        tasks.forEach(function (task) {
            tasksMap[task.id] = task;
        });

        var tasks_i = Immutable.fromJS(tasksMap);

        this.setState({
            tasks: tasks_i
        });
    }
};

export default TaskStore;
