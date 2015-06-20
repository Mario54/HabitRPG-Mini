import { Store } from "flummox";
var Immutable = require("immutable");

class FeedbackStore extends Store {
    constructor(flux) {
        super();

        const feedbackActions = flux.getActions("feedbacks");
        this.registerAsync(feedbackActions.showFeedback, this.beginShowFeedback, this.endShowFeedback);
        this.register(feedbackActions.dismissFeedback, this.handleDismissFeedback);

        this.state = {
          feedbacks: Immutable.fromJS({})
        };
    }

    beginShowFeedback(id, type, message) {
      this.setState({
        feedbacks: this.state.feedbacks.set(id, Immutable.fromJS({
          id,
          type,
          message
        }))
      });
    }

    endShowFeedback({id}) {
        this.removeFeedback(id);
    }

    handleDismissFeedback(id) {
        this.removeFeedback(id);
    }

    removeFeedback(id) {
      if (this.state.feedbacks.get(id)) {
        this.setState({
          feedbacks: this.state.feedbacks.delete(id)
        });
      }
    }

}

export default FeedbackStore;