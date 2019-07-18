import { Component } from "preact";
import "./style";
export default class Tagger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTags: [],
      fieldValue: null
    };
  }

  addTag(tagName) {
    var modifiedList = this.state.activeTags;
    modifiedList.push(tagName);
    this.setState({ activeTags: modifiedList, fieldValue: null });
    this.props.activeTagsDidChange(this.state.activeTags);
  }

  removeTag(tag) {
    let { activeTags } = this.state;
    let index = activeTags.indexOf(tag);
    activeTags.splice(index, 1);
    this.setState({ activeTags });
  }

  dispenseTags() {
    const { activeTags } = this.state;
    if (activeTags.length === 0) {
      return null;
    }
    return (
      <ul>
        {activeTags.map(tag => {
          return this.dispenseTag(tag);
        })}
      </ul>
    );
  }

  dispenseTag(tagName) {
    return (
      <li>
        <div class="tag-pill-item">
          <label>{tagName}</label>
          <button
            onClick={() => {
              this.removeTag(tagName);
            }}
          >
            X
          </button>
        </div>
      </li>
    );
  }

  onKeyPress(e) {
    // check for "Enter" key code on keyboard
    if (e.keyCode === 13) {
      this.addTag(e.target.value);
    }
  }

  render() {
    const { fieldValue } = this.state;
    return (
      <div class="tag_container">
        <input
          placeholder="Enter a Tag Name"
          value={fieldValue}
          onChange={e => {
            this.setState({ fieldValue: e.target.value });
          }}
          onKeyDown={e => {
            this.onKeyPress(e);
          }}
        />
        <div class="tag-area-container">{this.dispenseTags()}</div>
      </div>
    );
  }
}
