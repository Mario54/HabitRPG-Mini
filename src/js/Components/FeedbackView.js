var React = require("react");
var { ErrorView, SuccessView, WarningView } = require("./FeedbackItems");

var FeedbackView = React.createClass({
  render() {
    var views = this.props.feedbacks.map(function (feedback) {
      if (feedback.get("type") === "error") {
        return <li><ErrorView text={feedback.get("message")} /></li>;
      } else if (feedback.get("type") === "success") {
        return <li><SuccessView text={feedback.get("message")} /></li>;
      } else {
        return <li><WarningView text={feedback.get("message")} /></li>;
      }
    });
    return <ul>
      {views}
    </ul>;
  }
});

export default FeedbackView;
