function ItemsFactory({React}) {
    var EditItem = require('./EditItem')({React});

    var EditableDailyItem = React.createClass({
        render() {
            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get('completed')} />
                        <EditItem
                            editComponent={DailyItemEdit}
                            displayComponent={EditableTaskTextComponent}
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
            return (<div>
                        <input type="checkbox" onClick={this.toggleComplete} checked={this.props.item.completed} />
                        <EditItem
                            editComponent={TodoItemEdit}
                            displayComponent={EditableTaskTextComponent}
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

    var EditableHabitItem = React.createClass({
        render() {
            return (<div>
                    <button type="button">+</button>
                    <button type="button">-</button>
                        <EditItem
                            editComponent={HabitItemEdit}
                            displayComponent={EditableTaskTextComponent}
                            editAction={this.saveItem}
                            item={this.props.item} />
                    </div>);
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var HabitItemEdit = React.createClass({
        render() {
            return (
                <div>
                    <input type="text" onChange={this.onChange} value={this.props.item.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
        },

        finishEdit() {
            this.props.finishEdit();
        },

        onChange(e) {
            this.props.editTo(this.props.item.set('text', e.target.value));
        }
    });

    var TodoItemEdit = React.createClass({
        finishEdit() {
            this.props.finishEdit();
        },

        render() {
            return (
                <div>
                    <input type="text" onChange={this.onChange} value={this.props.item.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
        },

        onChange(e) {
            this.props.editTo(this.props.item.set('text', e.target.value));
        }
    });

    var DailyItemEdit = React.createClass({
        onChange(e) {
            this.props.editTo(this.props.item.set('text', e.target.value));
        },

        finishEdit() {
            this.props.finishEdit();
        },

        render() {
            return (
                <div>
                    <input type="text" onChange={this.onChange} value={this.props.item.get('text')} />
                    <button type="button" onClick={this.finishEdit}>Save</button>
                </div>
            );
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
