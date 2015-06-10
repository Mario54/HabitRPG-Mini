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

    /**
     * Action to communicate that all tasks should be loaded, overwriting the
     * other ones.
     * Used on the initial load of the application.
     */
    loadAllTasks(tasks) {
        return tasks;
    }
};
