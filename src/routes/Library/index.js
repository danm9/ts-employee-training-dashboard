import { Component } from "preact";
import Style from "./style.css";
import { Sidebar } from "../../components/sidebar";
import { getCourseLibrary } from "../../parse/functions";

export default class Library extends Component {
  state = { list: [] };

  componentDidMount() {
    const arr = [];

    getCourseLibrary().then(response => {
      const results = response.data.results;
      results.map(x => {
        if (x.title) {
          arr.push(x.title);
        }
      });

      this.setState({
        list: arr
      });
    });
  }

  render() {
    return (
      <div className={Style.Componentcontainer}>
        <Sidebar />
        <div className={Style.app}>
          <div className={Style.utilitybar}>
            <div className={Style.utilitybargrid}>
              <button class={Style.button}>Filter</button>
            </div>
          </div>
          <div className={Style.main}>Course Library</div>
          <div className={Style.grid}>
            {this.state.list.map(x => (
              <div className={Style.list}> {x} </div>
            ))}
          </div>
        </div>
      </div>

      /* <div className={Style.Componentcontainer}>
        <Sidebar />
        <div className={Style.app}>
          <div className={Style.utilitybar}>
            <div className={Style.utilitybargrid}>
              <button class={Style.button}>Filter</button>
            </div>
          </div>
          <div className={Style.main}>Course Library</div>
          <div className={Style.grid}>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>{" "}
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
            <div className={Style.list}>Programming 101</div>
            <div className={Style.list}>Python Basics</div>
            <div className={Style.list}>Cyber Threat Analysis</div>
            <div className={Style.list}>C++ Basics</div>
            <div className={Style.list}>HTML 5 Changes</div>
            <div className={Style.list}>Security Training</div>
            <div className={Style.list}>Ecmascript</div>
            <div className={Style.list}>Javascript Basics</div>
          </div>
        </div>
      </div> */
    );
  }
}
