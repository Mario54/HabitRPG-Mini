var React = require("react");
var { FeedbackView } = require("./FeedbackItems");
import { connect } from "react-redux";
import * as actions from "../actions";

var FeedbackArea = React.createClass({
  render() {
      const { dispatch, feedbacks } = this.props;

    var dismissMessage = (id) => {
      return () => {
        dispatch(actions.dismissFeedback(id));
      };
    };

    var views = feedbacks.map(function (feedback) {
      var dismiss = <span onClick={dismissMessage(feedback.get("id"))}>X</span>;
      return <FeedbackView dimiss={dismiss} feedback={feedback} />;
    });

    return (<ul className="feedback-list">
      {views}
    </ul>);
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
