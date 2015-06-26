var React = require("react");
var { FeedbackView } = require("./FeedbackItems");

var FeedbackArea = React.createClass({
  render() {
    var dismissMessage = (id) => {
      return () => {
        this.props.dismissFeedback(id);
      };
    };

    var views = this.props.feedbacks.map(function (feedback) {
      var dismiss = <span onClick={dismissMessage(feedback.get("id"))}>X</span>;
      return <FeedbackView dimiss={dismiss} feedback={feedback} />;
    });

    return <ul className="feedback-list">
      {views}
    </ul>;
  },

  dismissMessage() {

  }
});

export default FeedbackArea;
