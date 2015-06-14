var React = require("react");

var ErrorView = React.createClass({
  render() {
    return <span>{this.props.text}</span>;
  }
});

var SuccessView = React.createClass({
  render() {
    return <span>{this.props.text}</span>;
  }
});

var WarningView = React.createClass({
  render() {
    return <span>{this.props.text}</span>;
  }
});

export default {
  ErrorView,
  SuccessView,
  WarningView
};
