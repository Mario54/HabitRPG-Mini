var React = require("react");
var { ErrorView, SuccessView, WarningView } = require("./FeedbackItems");

var FeedbackView = React.createClass({
  render() {


    var dismissMessage = function(id) {
      return function() {
        this.props.flux.getActions("feedbacks").dismissFeedback(id);
      }.bind(this);
    }.bind(this);

    var views = this.props.feedbacks.map(function (feedback) {
      var dismiss = <span onClick={dismissMessage(feedback.get("id"))}>X</span>;
      if (feedback.get("type") === "error") {
        return <li className="error-message"><ErrorView text={feedback.get("message")} />
          <span className="dismiss-button">{dismiss}</span>
        </li>;
      } else if (feedback.get("type") === "success") {
        return <li className="success-message"><SuccessView text={feedback.get("message")} />
          <span className="dismiss-button">{dismiss}</span>
        </li>;
      } else {
        return <li className="warning-message">
          <WarningView text={feedback.get("message")} />
          <span className="dismiss-button">{dismiss}</span>
        </li>;
      }
    });

    return <ul className="feedback-list">
      {views}
    </ul>;
  },

  dismissMessage() {

  }
});

export default FeedbackView;
