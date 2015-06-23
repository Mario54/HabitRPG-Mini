import { Store } from "flummox";
var Immutable = require("immutable");

class UserStore extends Store {
  constructor(flux) {
    super();

    const userActions = flux.getActions("user");
    this.register(userActions.loadUserInfo, this.handleLoadUser);

    this.state = {};
  }

  getUserInfo() {
    return this.state.user;
  }

  handleLoadUser(user) {
    this.setState({user: Immutable.fromJS(user)});
  }

}

export default UserStore;
