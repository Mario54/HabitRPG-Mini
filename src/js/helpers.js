/**
 * Higher-order function that produces a filter to removes tasks
 * if they are completed and showCOmpleted option is false
 */
function filterCompleted (showCompleted) {
    return function (todo) {
        if (showCompleted) {
          return true;
        }

        if (todo.get("completed")) {
            return false;
        }

        return true;
    };
}

function orderTasks(task1, task2) {
    if (task1.get("type") === "habit") {
      return task1.get("text").localeCompare(task2.get("text"));
    }

    if ( !task1.get("completed") && task2.get("completed")) {
        return -1;
    } else if (task1.get("completed") && !task2.get("completed")) {
        return 1;
    }

    return task1.get("text").localeCompare(task2.get("text"));
}

function isTaskType(type) {
    return function (item) {
        return item && item.get("type") === type;
    };
}

var isHabit = isTaskType("habit"),
    isDaily = isTaskType("daily"),
    isTodo = isTaskType("todo");

export default {
    filterCompleted,
    orderTasks,
    isHabit,
    isDaily,
    isTodo
};
