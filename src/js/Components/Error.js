
function ErrorFactory({ React }) {

    var ErrorComponent = React.createClass({
        render() {
            return <div className="error-display">{this.props.errorMessage}</div>;
        }
    });

    return ErrorComponent;
}

export default ErrorFactory;
