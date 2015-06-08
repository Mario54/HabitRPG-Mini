import { Actions } from 'flummox';

export default class TaskActions extends Actions {
    newTask(content) {
        return content;
    }

    saveTask(task) {
        return task;
    }

    deleteTask(task) {
        return task;
    }
};
