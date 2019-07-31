export const parse = {
  appId: "your_app_id",
  cKey: "client_key",
  userPointer: {
    __type: "Pointer",
    className: "_User",
    objectId: window.sessionStorage.objectId
  },
  url: "http://localhost:1337/parse/"
};
