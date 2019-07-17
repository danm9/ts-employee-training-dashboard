import Parse from "parse";
import axios from "axios";

const parseURL = "http://localhost:1337/parse/";

const userPointer = {
  __type: "Pointer",
  className: "_User",
  objectId: window.localStorage.objectId
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
      "X-Parse-Application-id": "your_app_id",
      "X-Parse-REST-API-Key": "client_key",
      "Content-Type": "application/json"
    },
    data: {
      skill: action,
      name: name,
      user: userPointer
    }
  });
};

export const getUserWithSkill = name => {};

export const getUserwithId = objectId => {};
