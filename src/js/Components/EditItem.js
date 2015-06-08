function EditItemFactory({React}) {
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
                return <EditingComponent item={this.props.item} finishEdit={this.onFinishEdit} />
            }

            return <NormalComponent item={this.props.item} onEdit={this.editItem} />
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
