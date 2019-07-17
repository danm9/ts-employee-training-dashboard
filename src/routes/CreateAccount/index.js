import { Component } from "preact";
import axios from "axios";
import Style from "./style.css";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    console.log(data);
    axios({
      method: "post",
      url: "http://localhost:1300/data",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    });

    // const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:1300/data", true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.send(JSON.stringify(data));
    // console.log(JSON.stringify(data));
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { email, psw, username } = this.state;
    return (
      <div>
        <h1>Sign up here!</h1>
        <form onSubmit={this.handleSubmit} style={{ border: "1px solid #ccc" }}>
          <div className={Style.container}>
            <h1>Career Slayer </h1>
            <label htmlFor="firstName">
              <b>First Name </b>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              required
              onChange={this.handleInputChange}
            />
            <label htmlFor="lastName">
              <b>Last Name </b>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              required
              onChange={this.handleInputChange}
            />
            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
              onChange={this.handleInputChange}
            />
            <label htmlFor="username">
              <b>Username</b>{" "}
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={this.handleInputChange}
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={this.handleInputChange}
            />
            <label htmlFor="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              required
              onChange={this.handleInputChange}
            />
            <label>
              <input type="checkbox" defaultChecked="checked" name="remember" />
              Remember me{" "}
            </label>
            <div className="cearfix">
              <input
                value="Sign Up"
                type="submit"
                className={Style.signupbtn}
              />
              <button type="button" className={Style.cancelbtn}>
                <a href="/login" style="color: white">
                  Already have an account?
                </a>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateAccount;
