
function ErrorFactory({ React }) {

    var ErrorComponent = React.createClass({
        render() {
            return <div className="error-message">{this.props.errorMessage}</div>;
        }
    });

    return ErrorComponent;
}

export default ErrorFactory;
