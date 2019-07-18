import { Component } from "preact";
import Style from "./forgot.css";

export default class Forgot extends Component {
  render() {
    return (
      <div>
        <div className={Style.container}>
          <div className={Style.main}>Forgot Password?</div>
          <label for="email">
            <b>Email Address</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email Address"
            name="email"
            required
          />
          <button type="submit">Reset Password</button>
          <button type="button" className={Style.cancelbtn}>
            <a href="/login" style="color: white">
              Cancel
            </a>
          </button>
        </div>
      </div>
    );
  }
}
