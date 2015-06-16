function EditItemFactory({React}) {

    var ItemEdit = React.createClass({
        getInitialState() {
            return {
                editedItem: this.props.item
            };
        },

        finishEdit() {
            this.props.finishEdit(this.state.editedItem);
        },

        editTo(item) {
            this.setState({
                editedItem: item
            });
        },

        render() {
            var Component = this.props.component;
            return <Component editTo={this.editTo} finishEdit={this.finishEdit} item={this.state.editedItem} />;
        }
    });

    var EditItem = React.createClass({
        getInitialState() {
            return {
                editing: false
            };
        },

        render() {
            var EditingComponent = this.props.editComponent;
            var NormalComponent = this.props.displayComponent;

            if (this.state.editing) {
                return <ItemEdit component={EditingComponent} item={this.props.item} finishEdit={this.onFinishEdit} />;
            }

            return <NormalComponent item={this.props.item} onEdit={this.editItem} />;
        },

        editItem() {
            this.setState({
                editing: true
            });
        },

        onFinishEdit(editedItem) {
            this.setState({
                editing: false
            });

            this.props.editAction(editedItem);
        }

    });

    return EditItem;
}

export default EditItemFactory;
