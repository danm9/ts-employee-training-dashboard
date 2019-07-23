import Parse from "parse";
import axios from "axios";

const parseURL = "http://localhost:1337/parse/";

const userPointer = {
  __type: "Pointer",
  className: "_User",
  objectId: window.sessionStorage.objectId
};

const appId = "your_app_id";
const cKey = "client_key";

// Parse does authenticating on it's own.
export const authenticating = async () => {
  const response = await axios({
    url: parseURL + "sessions/me",
    method: "get",
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": cKey,
      "X-Parse-Session-Token": window.sessionStorage.session
    },
    responseType: "json"
  });
  console.log(response.data.user.objectId);
  if (response.data.user.objectId == window.sessionStorage.objectId) {
    return true;
  }
  return false;
};

export const getUserWithSkill = name => {};

export const getUserwithId = objectId => {};

export const nameFirst = async () => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", window.sessionStorage.objectId);
  return query.find();
};

export const nameLast = async () => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", window.sessionStorage.objectId);
  return query.find();
};

export const passwordReset = email => {
  axios({
    method: "post",
    url: parseURL + "requestPasswordReset",
    headers: {
      "X-Parse-Application-id": appId,
      "X-Parse-REST-API-Key": cKey,
      "Content-Type": "application/json"
    },
    data: {
      email: email
    }
  });
};

export const profileImage = async objectId => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", objectId);
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
