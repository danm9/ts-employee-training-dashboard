import Parse from "parse";
import axios from "axios";

const parseURL = "http://localhost:1337/parse/";

const userPointer = {
  __type: "Pointer",
  className: "_User",
  objectId: window.localStorage.objectId
};

const appId = "your_app_id";
const cKey = "client_key";

// Parse does authenticating on it's own.
export const authenticating = async () => {
  const response = await axios({
    url: "http://localhost:1337/parse/sessions/me",
    method: "get",
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": cKey,
      "X-Parse-Session-Token": window.localStorage.session
    },
    responseType: "json"
  });
  console.log(response.data.user.objectId);
  if (response.data.user.objectId == window.localStorage.objectId) {
    return true;
  }
  return false;
};

export const profileImage = async objectId => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", objectId);
  return query.find();
};

export const nameFirst = async () => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", window.localStorage.objectId);
  return query.find();
};

export const nameLast = async () => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", window.localStorage.objectId);
  return query.find();
};

export const skills = () => {
  const Skills = Parse.Object.extend("Skills");
  const query = new Parse.Query(Skills);
  query.equalTo("user", userPointer);
  return query.find();
};

export const skill = (action, name) => {
  axios({
    method: "post",
    url: parseURL + "functions/skills",
    headers: {
      "X-Parse-Application-id": appId,
      "X-Parse-REST-API-Key": cKey,
      "Content-Type": "application/json"
    },
    data: {
      skill: action,
      name: name,
      user: userPointer
    }
  });
};

export const getUsersWithSkill = name => {
  const skills = Parse.Object.extend("Skills");
  const query = new Parse.Query(skills);
  query.equalTo("name", name);
  return query.find();
};

export const getUserwithId = objectId => {};
