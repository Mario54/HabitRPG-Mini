function ItemsFactory({React}) {
    var EditItem = require('./EditItem')({React});
    var TextEdit = require('./TextEdit')({React});

    var EditableDailyItem = React.createClass({
        render() {
            /*var item = <EditItem editComponent={TextEdit}
                                 displayComponent={EditableTaskTextComponent}
                                 editAction={this.saveItem}
                                 item={this.props.item} />;*/
            var item = <span>{this.props.item.get('text')}</span>;

            return (<div>
                        <input type="checkbox" onChange={this.toggleComplete} checked={this.props.item.get('completed')} />
                        {item}
                    </div>);
        },

        toggleComplete(e) {
            var completed = e.target.checked;
            var item = this.props.item.set('completed', completed);

            console.log('Saving item');
            console.log(item.toJS());
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

            var item = <span>{this.props.item.get('text')}</span>;

            return (<div>
                        <input type="checkbox" onClick={this.toggleComplete} checked={this.props.item.completed} />
                        {item}
                    </div>);
        },

        toggleComplete(e) {
            var completed = e.target.checked;
            var item = this.props.item.set('completed', completed);

            // this.props.flux.getActions('tasks').saveTask(item);
            this.props.flux.getActions('tasks').updateTaskScore(item, completed ? 'up' : 'down');
        },

        saveItem(item) {
            this.props.flux.getActions('tasks').saveTask(item);
        }
    });

    var EditableHabitItem = React.createClass({
        render() {
            var habit = this.props.item,
                upButton = <button onClick={this.upButtonClicked} type="button">+</button>,
                downButton = <button onClick={this.downButtonClicked} type="button">-</button>;

            if ( ! habit.get('up')) {
                upButton = "";
            }

            if ( ! habit.get('down')) {
                downButton = "";
            }

            /*var item = <EditItem editComponent={TextEdit}
                                 displayComponent={EditableTaskTextComponent}
                                 editAction={this.saveItem}
                                 item={this.props.item} />;*/

            var item = <span>{this.props.item.get('text')}</span>;

            return (<div>
                        {upButton}
                        {downButton}
                        {item}
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
