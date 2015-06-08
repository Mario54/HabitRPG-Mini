import { Store } from 'flummox';
import Immutable from 'immutable';
import assign    from 'object-assign';
import uuid      from 'uuid';

class TaskStore extends Store {

    constructor(flux) {
        super();

        const taskActions = flux.getActions('tasks');
        this.register(taskActions.newTask, this.handleNewTask);
        this.register(taskActions.saveTask, this.handleSaveTask);
        this.register(taskActions.deleteTask, this.handleDeleteTask);

        this.state = {
            todos: Immutable.fromJS({
                1: { id: 1, text: 'test 1', type: 'todo'  },
                2: { id: 2, text: 'test 2', type: 'daily' },
                3: { id: 3, text: 'test 3', type: 'habit' },
                4: { id: 4, text: 'test 4', type: 'todo'  },
                5: { id: 5, text: 'test 5', type: 'daily' },
                6: { id: 6, text: 'test 6', type: 'habit' },
                7: { id: 7, text: 'test 7', type: 'todo'  },
                8: { id: 8, text: 'test 8', type: 'daily' },
                9: { id: 9, text: 'test 9', type: 'habit' },
            })
        };
    }

    handleNewTask(content) {
        var todo = Immutable.fromJS(assign({}, content, { id: uuid.v4() }));

        this.setState({
            todos: this.state.todos.set(todo.get('id'), todo)
        });
    }

    /**
     * Saves the task in the state of the Store. If the task has no id, it will be
     * generated.
     */
    handleSaveTask(task) {
        var todos = this.state.todos.set(task.get('id').toString(), task);
        this.setState({
            todos
        });
    }

    /**
     * Deletes the task from the store. If the id is not set, nothing will change in the store.
     */
    handleDeleteTask(task) {
        this.setState({
            todos: this.state.todos.delete(task.get('id'))
        })
    }
};

export default TaskStore;
