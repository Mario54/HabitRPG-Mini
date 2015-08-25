
function ItemsFactory({React}) {
    var HabitControls = require("./HabitControls")({React});

    var TaskItem = React.createClass({
        render() {
            var taskType = this.props.item.get("type");

            if (taskType === "daily") {
                return <DailyItem {...this.props} />;
            } else if (taskType === "todo") {
                return <TodoItem {...this.props} />;
            } else {
                return <HabitItem {...this.props} />;
            }
        }

    });

    var DailyItem = React.createClass({
        render() {
            var item = <label onClick={this.toggleComplete}>{this.props.item.get("text")}</label>;

            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get("completed")} />
                        {item}
                    </div>);
        },

        toggleComplete() {
            var completed = !this.props.item.get("completed");
            var item = this.props.item.set("completed", completed);

            this.props.updateTaskScore(item, completed ? "up" : "down");
        }
    });

    var TodoItem = React.createClass({
        render() {
            var item = <label onClick={this.toggleComplete}>{this.props.item.get("text")}</label>;

            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get("completed")} />
                        {item}
                    </div>);
        },

        toggleComplete() {
            var completed = !this.props.item.get("completed");
            var item = this.props.item.set("completed", completed);

            this.props.updateTaskScore(item, completed ? "up" : "down");
        }
    });

    var HabitItem = React.createClass({
        render() {
            var habit = this.props.item,
                buttons = <HabitControls showPlus={habit.get("up")}
                                         showMinus={habit.get("down")}
                                         upButtonClicked={this.upButtonClicked}
                                         downButtonClicked={this.downButtonClicked} />;

            var item = <label>{this.props.item.get("text")}</label>;

            return (<div className="habit-wrap">
                        <div className="habit-controls">{buttons}</div>
                        <div className="habit-text">{item}</div>
                    </div>);
        },

        upButtonClicked() {
            this.props.updateTaskScore(this.props.item, "up");
        },

        downButtonClicked() {
            this.props.updateTaskScore(this.props.item, "down");
        }
    });

    return TaskItem;
}

export default ItemsFactory;
