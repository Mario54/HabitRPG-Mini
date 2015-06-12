function ItemsFactory({React}) {
    var EditItem = require('./EditItem')({React});
    var TextEdit = require('./TextEdit')({React});
    var HabitControls = require('./HabitControls')({React});

    var EditableDailyItem = React.createClass({
        render() {
            /*var item = <EditItem editComponent={TextEdit}
                                 displayComponent={EditableTaskTextComponent}
                                 editAction={this.saveItem}
                                 item={this.props.item} />;*/
            var item = <label onClick={this.toggleComplete}>{this.props.item.get('text')}</label>;

            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get('completed')} />
                        {item}
                    </div>);
        },

        toggleComplete(e) {
            var completed = ! this.props.item.get('completed');
            var item = this.props.item.set('completed', completed);

            this.props.flux.getActions('tasks').updateTaskScore(item, completed ? 'up' : 'down');
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableTodoItem = React.createClass({
        render() {
            /*var item = <EditItem editComponent={TextEdit}
                                 displayComponent={EditableTaskTextComponent}
                                 editAction={this.saveItem}
                                 item={this.props.item} />;*/

            var item = <label onClick={this.toggleComplete}>{this.props.item.get('text')}</label>;

            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get('completed')} />
                        {item}
                    </div>);
        },

        toggleComplete(e) {
            var completed = ! this.props.item.get('completed');
            var item = this.props.item.set('completed', completed);

            this.props.flux.getActions('tasks').updateTaskScore(item, completed ? 'up' : 'down');
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableHabitItem = React.createClass({
        render() {
            var habit = this.props.item,
                buttons = <HabitControls showPlus={habit.get('up')}
                                         showMinus={habit.get('down')}
                                         upButtonClicked={this.upButtonClicked}
                                         downButtonClicked={this.downButtonClicked} />

            /*var item = <EditItem editComponent={TextEdit}
                                 displayComponent={EditableTaskTextComponent}
                                 editAction={this.saveItem}
                                 item={this.props.item} />;*/

            var item = <label>{this.props.item.get('text')}</label>;

            return (<div className="habit-wrap">
                        <div className="habit-controls">{buttons}</div>
                        <div className="habit-text">{item}</div>
                    </div>);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        },

        upButtonClicked(e) {
            this.props.flux.getActions('tasks').updateTaskScore(this.props.item, 'up');
        },

        downButtonClicked(e) {
            this.props.flux.getActions('tasks').updateTaskScore(this.props.item, 'down');
        }
    });

    var EditableTextComponent = React.createClass({
        render() {
            return <span onClick={this.props.onEdit}>{this.props.text}</span>;
        }
    });

    var EditableTaskTextComponent = React.createClass({
        render() {
            return <EditableTextComponent onEdit={this.props.onEdit} text={this.props.item.get('text')} />;
        }
    });

    return {
        EditableHabitItem,
        EditableTodoItem,
        EditableDailyItem
    };
}

export default ItemsFactory;
