function NewItemFormFactory({React}) {

    var NewItemForm = React.createClass({
        getInitialState() {
            return {
                text: ''
            };
        },

        render() {
            return (
                <div>
                    <input type="text" name="title" value={this.state.text} onChange={this.textChanged} />
                    <button type="button" onClick={this.submitForm}>+</button>
                </div>
            );
        },

        submitForm() {
            this.props.submit(this.state.text);
            this.setState({
                text: ''
            });
        },

        textChanged: function(e) {
            e.preventDefault();

            this.setState({text: e.target.value});
        }
    });

    return NewItemForm;
}

export default NewItemFormFactory;
