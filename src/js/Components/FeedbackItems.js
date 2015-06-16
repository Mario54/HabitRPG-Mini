var React = require("react");

var ErrorView = React.createClass({
  render() {
    return (<li className="error-message">
        <span>{this.props.text}</span>
        <span className="dismiss-button">{this.props.dismissed}</span>
      </li>);
  }
});

var SuccessView = React.createClass({
  render() {
    return (<li className="success-message">
        <span>{this.props.text}</span>
        <span className="dismiss-button">{this.props.dismissed}</span>
      </li>);
  }
});

var WarningView = React.createClass({
  render() {
    return (<li className="warning-message">
        <span>{this.props.text}</span>
        <span className="dismiss-button">{this.props.dismissed}</span>
      </li>);
  }
});

var FeedbackView = React.createClass({
  render() {
    var feedback = this.props.feedback,
        dismissAction = this.props.dimiss;
    if (this.props.feedback.get("type") === "error") {
      return <ErrorView dismissed={dismissAction} text={feedback.get("message")} />;
    } else if (feedback.get("type") === "success") {
      return <SuccessView dismissed={dismissAction} text={feedback.get("message")} />;
    } else {
      return <WarningView dismissed={dismissAction} text={feedback.get("message")} />;
    }
  }
});

export default {
  ErrorView,
  SuccessView,
  WarningView,
  FeedbackView
};
