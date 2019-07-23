import { Component } from "preact";
import Style from "./forgot.css";
import { passwordReset } from "../../parse/functions";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    passwordReset(this.state.email);
    document.getElementById("pwdForm").reset();
  };

  render() {
    return (
      <div>
        <div className={Style.container}>
          <div className={Style.main}>Forgot Password?</div>
          <form onSubmit={this.handleSubmit} id="pwdForm">
            {" "}
            <label for="email">
              <b>Email Address</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email Address"
              name="email"
              required
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Reset Password" />
            <button type="button" className={Style.cancelbtn}>
              <a href="/login" style="color: white">
                Cancel
              </a>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
