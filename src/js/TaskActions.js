import { Actions } from "flummox";
var Promise = require("promise");

function TaskActionsFactory({api}) {

    return class TaskActions extends Actions {
        /**
         * Updates the score of a task with the specified direction.
         * Returns a promise from a http get request.
         */
        updateTaskScore(task, direction) {
            var promise = new Promise(function (resolve, reject) {
              api.updateTaskScore(task.get("id"), direction, function(error, response) {
                  // mutating = bad, use object assign?
                  var message = response;
                  message.task = task;
                  message.direction = direction;

                  // reject({task, direction});

                  if (error) { reject(error); }
                  else { resolve(message); }
              });
            });

            return promise;
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
}

export default TaskActionsFactory;
