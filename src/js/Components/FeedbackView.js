var React = require("react");
var { FeedbackView } = require("./FeedbackItems");
import { connect } from "react-redux";

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

function selector(state) {
    return {
        feedbacks: state.feedbacks
    };
}

export default connect(selector)(FeedbackArea);
