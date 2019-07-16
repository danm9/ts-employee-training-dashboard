import { Component } from "preact";
import style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import {
  profileImage,
  skills,
  skill,
  nameFirst,
  nameLast
} from "../../parse/functions";

export default class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      skill: "",
      action: "",
      nameFirst: "",
      nameLast: ""
    };
  }

  addClick = () => this.setState({ action: "add" });
  deleteClick = () => this.setState({ action: "delete" });
  clearForm = () => document.getElementById("skillsForm").reset();

  handleSubmit = event => {
    event.preventDefault();
    skill(this.state.action, this.state.skill);

    // This is the problem
    skills().then(x => {
      let list = [];
      x.map(item => list.push(item.attributes.name + " "));
      this.setState({ skills: list });
      console.log(list);
    });

    this.clearForm();
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    profileImage(window.localStorage.objectId).then(image => {
      this.setState({ profilePic: image[0].attributes.image });
    });

    skills().then(x => {
      let list = [];
      x.map(item => list.push(item.attributes.name + " "));
      this.setState({ skills: list });
      console.log(list);
    });

    nameFirst().then(data =>
      this.setState({ nameFirst: data[0].attributes.firstName })
    );
    nameFirst().then(data =>
      this.setState({ nameLast: data[0].attributes.lastName })
    );
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className={style.Componentcontainer} />
        <div className={style.main}>
          <p>Career Slayer</p>
        </div>
        <div className={style.profile}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1KxvZupKbmEe6in-tGQIker6Rc3JhjCuxG-HJtpW3vhkttCP"
            alt="Unknown User"
            width="65"
            height="65"
          />
          <div className={style.firstName}>First Name: John</div>
          <div className={style.lastName}>Last Name: Doe</div>
          <div className={style.startDate}>Start Date: 11/3/2018</div>
          <div className={style.skills}>
            Skills: JavaScript, Java, C++, Swift, Python, HTML, CSS
          </div>
          <div className={style.lastName}>Last Name: {this.state.nameLast}</div>
          <div className={style.dateOfBirth}>Start Date: November 3, 2018</div>
          <div className={style.skills}>Skills: {this.state.skills}</div>
          <form onSubmit={this.handleSubmit} id="skillsForm">
            <input
              type="text"
              name="skill"
              required
              onChange={this.handleInputChange}
            />
            <input
              type="submit"
              value="add"
              name="add"
              onClick={this.addClick}
            />{" "}
            <input
              type="submit"
              value="delete"
              name="delete"
              onClick={this.deleteClick}
            />
          </form>
        </div>
        {/*<div className={style.box}>Knowledge Area</div>*/}
        <div className={style.table}>
          <div className={style.knowledgeArea}>Knowledge Area</div>
          <div className={style.capabilityLevel}>Capability Level</div>
          <div className={style.configurationManagement}>
            Configuration Management
          </div>
          <div className={style.construction}>Construction</div>
          <div className={style.design}>Design</div>
          <div className={style.foundations}>Foundations</div>
          <div className={style.maintenance}>Maintenance</div>
          <div className={style.modelsAndMethods}>Models and Methods</div>
          <div className={style.process}>Process</div>
          <div className={style.management}>Management</div>
          <div className={style.quality}>Quality</div>
          <div className={style.requirements}>Requirements</div>
          <div className={style.testing}>Testing</div>
          <div className={style.introductory}>Introductory</div>
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.competence}>Competence</div>
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.leadership}>Leadership</div>
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.mastery}>Mastery</div>
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
          <div className={style.blank} />
        </div>
        {/*<div className={style.grid2}>
          <div className={style.category}>Category</div>
          <div className={style.activity}>Activity</div>
          <div className={style.reading}>Reading</div>
          <div className={style.blank1} />
          <div className={style.training}>Training</div>
          <div className={style.blank2} />
          <div className={style.professionalExperience}>
            Professional Experience
          </div>
          <div className={style.blank3} />
    </div>*/}
      </div>
    );
  }
}
