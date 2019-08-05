import Parse from "parse";
import axios from "axios";
import parse from "./parse.config";

const parseURL = "http://localhost:1337/parse/";

export const userPointer = {
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

  sessionStorage.clear();
  return false;
};

export const authSession = async () => {
  if (sessionStorage.session) {
    return axios({
      url: parseURL + "sessions/me",
      method: "get",
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": cKey,
        "X-Parse-Session-Token": window.sessionStorage.session
      },
      responseType: "json"
    });
  }
};

export const getCourseLibrary = async () => {
  return axios({
    method: "get",
    url: parseURL + "classes/Library",
    headers: {
      "X-Parse-Application-id": appId,
      "X-Parse-REST-API-Key": cKey
    }
  });
};

export const deleteCard = objectId => {
  axios({
    method: "delete",
    url: parseURL + "classes/Card/" + objectId,
    headers: {
      "X-Parse-Application-id": appId,
      "X-Parse-REST-API-Key": cKey
    }
  });
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

export const findCard = card => {
  const Card = Parse.Object.extend("Card");
  const query = new Parse.Query(Card);
  query.equalTo("user", userPointer);
  query.equalTo("name", card.name);
  query.equalTo("desc", card.description);
  return query.find();
};

export const profileImage = async objectId => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("objectId", objectId);
  return query.find();
};

export const sessionTokenMe = async sessionToken => {
  const query = new Parse.Query(Parse.Session);
  query.equalTo("sessionToken", sessionToken);
  return query.find({ useMasterKey: true });
};

export const InitialSessionValue = () => {
  if (sessionStorage.auth == "true") {
    return true;
  }

  return false;
};

export const receiveCard = () => {
  const Card = Parse.Object.extend("Card");
  const query = new Parse.Query(Card);
  query.equalTo("user", userPointer);
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

export const updateCard = (objectId, change) => {
  axios({
    method: "put",
    url: parseURL + "classes/Card/" + objectId,
    headers: {
      "X-Parse-Application-id": appId,
      "X-Parse-REST-API-Key": cKey,
      "Content-Type": "application/json"
    },
    data: {
      position: change
    }
  });
};
