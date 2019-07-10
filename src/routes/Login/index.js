import { Component } from "preact";
import Style from "./style.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className={Style.container}>
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
          <button type="submit">
            <a href="/" style="color:white">
              Login
            </a>
          </button>
          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>
          <br />
          <button className={Style.createbtn}>
            <a href="/createaccount" style="color: white">
              Create an account
            </a>
          </button>
          <button className={Style.psw}>
            <a href="/forgot" style="color: white">
              Forgot Password
            </a>
          </button>
        </div>
      </div>
    );
  }
}
