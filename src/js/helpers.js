import Immutable from "immutable";


function getDayString(day) {
    var days = {
        0: "su",
        1: "m",
        2: "t",
        3: "w",
        4: "th",
        5: "f",
        6: "s"
    };

    return days[day];
}

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

/**
  * Returns all the tasks that are active today.
  */
function getTodaysTasks(tasks, options) {
    // var { includeCompletedTodos } = options || {};

    if ( !tasks ) {
        return Immutable.List();
    }

    let todaysTasks = tasks.filter((task) => {
        if ( !task.get ) {
            return false;
        }

        var type = task.get("type");

        // if the daily scheduled for today?
        if (type === "daily") {
            var currentDay = getDayString((new Date()).getDay());

            return task.get("repeat").get(currentDay);
        }

        return true;
    });

    return todaysTasks.sort(orderTasks);
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
    getTodaysTasks,
    orderTasks,
    isHabit,
    isDaily,
    isTodo
};
