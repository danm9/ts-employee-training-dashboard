import { h, Component } from "preact";
import Style from "./style.css";
import axios from "axios";
import { authenticating } from "../../parse/functions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const arr = []; // To hold session token

    axios({
      method: "post",
      url: "http://localhost:1300/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    })
      .then(response => {
        console.log(response.data);
        localStorage.clear();
        sessionStorage.clear();

        localStorage.setItem("session", response.data[0]);
        localStorage.setItem("objectId", response.data[1]);
        if (window.localStorage.session && window.localStorage.objectId) {
          sessionStorage.setItem("auth", "true");
        }
      })
      .then(() => window.location.replace("/"));
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1 style="text-align:center;">Career Slayer</h1>
        <h4 style="text-align:center;">Welcome, please sign in</h4>
        <form onSubmit={this.handleSubmit}>
          {/*<div className={Style.imgcontainer}>
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>*/}
          <div className={Style.container}>
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={this.handleInputChange}
            />
            <br />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={this.handleInputChange}
            />
            <br />
            <input
              type="submit"
              style="background-color: #4caf50; color: white; padding: 14px 20px; margin: 8px 0; width: 100%;"
            />
            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" />{" "}
              Remember me
            </label>
          </div>
          <div className={Style.container}>
            {/*<button type="button" className="cancelbtn">
              Cancel
        </button>*/}
            <span className={Style.forgot}>
              <a href="/forgot">Forgot password?</a>
            </span>
            <span className={Style.create}>
              <a href="/createaccount">Don't already have an account?</a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
