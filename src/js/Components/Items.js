function ItemsFactory({React}) {
    var EditItem = require('./EditItem')({React});

    var EditableDailyItem = React.createClass({
        render() {
            return (<div>
                        <input type="checkbox" onClick={this.toggleComplete} checked={this.props.item.completed} />
                        <EditItem
                            editComponent={DailyItemEdit}
                            displayComponent={DailyItem}
                            editAction={this.saveItem}
                            item={this.props.item} />
                    </div>);
        },

        toggleComplete(e) {
            var item = this.props.item.set('completed', e.target.checked);
            this.props.flux.getActions('tasks').saveTask(item);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableTodoItem = React.createClass({
        render() {
            return <EditItem
                        editComponent={TodoItemEdit}
                        displayComponent={TodoItem}
                        editAction={this.props.flux.getActions('tasks').saveTask}
                        item={this.props.item} />;
        }
    });

    var EditableHabitItem = React.createClass({
        render() {
            return <EditItem
                        editComponent={HabitItemEdit}
                        displayComponent={HabitItem}
                        editAction={this.props.flux.getActions('tasks').saveTask}
                        item={this.props.item} />;
        }
    });

    var HabitItem = React.createClass({
        render() {
            return (
                <div>
                    <button>+</button>
                    <button>-</button>
                    <span onClick={this.props.onEdit}>{this.props.item.get('text')}</span>
                </div>
            );
        }
    });

    var HabitItemEdit = React.createClass({
        getInitialState() {
            return {
                editedItem: this.props.item
            };
        },

        onChange(e) {
            e.preventDefault();

            this.setState({
                editedItem: this.state.editedItem.set('text', e.target.value)
            });
        },

        finishEdit() {
            this.props.finishEdit(this.state.editedItem);
        },

        render() {
            return (
                <div>
                    <button type="button">+</button>
                    <button type="button">-</button>
                    <input type="text" onChange={this.onChange} value={this.state.editedItem.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
        }
    });

    var TodoItemEdit = React.createClass({
        getInitialState() {
            return {
                editedItem: this.props.item
            };
        },

        onChange(e) {
            e.preventDefault();

            this.setState({
                editedItem: this.state.editedItem.set('text', e.target.value)
            });
        },

        finishEdit() {
            this.props.finishEdit(this.state.editedItem);
        },

        render() {
            return (
                <div>
                    <input type="text" onChange={this.onChange} value={this.state.editedItem.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
        }
    });

    var DailyItemEdit = React.createClass({
        getInitialState() {
            return {
                editedItem: this.props.item
            };
        },

        onChange(e) {
            e.preventDefault();

            this.setState({
                editedItem: this.state.editedItem.set('text', e.target.value)
            });
        },

        finishEdit() {
            this.props.finishEdit(this.state.editedItem);
        },

        render() {
            return (
                <div>
                    <input type="text" onChange={this.onChange} value={this.state.editedItem.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
        }
    });

    var TodoItem = React.createClass({
        render() {
            return (
                <div>
                    <input type="checkbox" />
                    <span onClick={this.props.onEdit}>{this.props.item.get('text')}</span>
                </div>
            );
        }
    });

    var DailyItem = React.createClass({
        render: function() {
            return (
                <div>
                    <span onClick={this.props.onEdit}>{this.props.item.get('text')}</span>
                </div>
            );
        }
    });

    return {
        EditableHabitItem,
        EditableTodoItem,
        EditableDailyItem
    };
}

export default ItemsFactory;
