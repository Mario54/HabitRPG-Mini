import { Actions } from 'flummox';
var Promise = require('promise');

function TaskActionsFactory(api) {

    return class TaskActions extends Actions {
        newTask(content) {
            return content;
        }

        saveTask(task) {
            return task;
        }

        updateTaskScore(task, direction) {
            var promise = new Promise(function (resolve, reject) {
            //   get('http://www.google.com', function (err, res) {
            //     if (err) reject(err);
            //     else resolve(res);
            //   });
              api.updateTaskScore(task.get('id'), direction, function(error, response) {
                  // mutating = bad, use object assign?
                  var message = response;
                  message.task = task;
                  message.direction = direction;

                  if (error) reject(error);
                  else resolve(message);
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
