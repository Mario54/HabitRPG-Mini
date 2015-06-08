
function TextEditFactory({React}) {

    var TextEdit = React.createClass({
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

    return TextEdit;
}

export default TextEditFactory;
