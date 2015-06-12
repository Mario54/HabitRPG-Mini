
function ErrorFactory({ React }) {

    var Error = React.createClass({
        render() {
            return <div className="error-display">{this.props.errorMessage}</div>
        }
    });

    return Error;
}

export default ErrorFactory;
