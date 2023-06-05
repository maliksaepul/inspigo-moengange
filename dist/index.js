var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  MOENGAGE_AUTH_SOURCE: () => MOENGAGE_AUTH_SOURCE,
  MOENGAGE_GENDER: () => MOENGAGE_GENDER,
  MOENGAGE_PROPERTY: () => MOENGAGE_PROPERTY,
  calculateAge: () => calculateAge,
  initializeUserSession: () => initializeUserSession,
  moengageTrackEvent: () => moengageTrackEvent,
  moengageTrackUser: () => moengageTrackUser
});
module.exports = __toCommonJS(src_exports);
var import_web_sdk = __toESM(require("@moengage/web-sdk"));
var calculateAge = (dob) => {
  const diffMs = Date.now() - new Date(dob);
  const age = new Date(diffMs);
  return Math.abs(age.getUTCFullYear() - 1970);
};
var MOENGAGE_PROPERTY = {
  ADD_USER_SESSION: "add_user_session",
  REMOVE_USER_SESSION: "remove_user_session",
  UPDATE_USER_SESSION: "update_user_session",
  OPEN_ALBUM_OR_PLAYLIST: "Open Album or Playlist",
  PLAY_AUDIO: "Play Audio",
  LOGIN: "Login",
  LOGOUT: "Logout",
  SIGNUP: "Register",
  SEARCH: "Keyword Search",
  OPEN_VIDEO: "Open Video",
  PLAY_VIDEO: "Play Video",
  OPEN_STS: "Open STS",
  OPEN_LEARNING_PATH: "Open Learning Path",
  PLAY_INSPIMIX: "Play InspiMix"
};
var MOENGAGE_AUTH_SOURCE = {
  FORM: "form",
  GOOGLE: "google",
  FACEBOOK: "facebook"
};
var MOENGAGE_GENDER = {
  MALE: "Male",
  FEMALE: "Female"
};
var initializeUserSession = (data) => {
  const userId = data.id;
  const name = data.name;
  setTimeout(() => {
    moengageTrackUser(MOENGAGE_PROPERTY.ADD_USER_SESSION, { userId });
    import_web_sdk.default.add_first_name(name.split(" ").slice(0, -1).join(" "));
    import_web_sdk.default.add_last_name(name.split(" ").slice(-1).join(" "));
    import_web_sdk.default.add_email(data.email);
    import_web_sdk.default.add_mobile(data.phone);
    import_web_sdk.default.add_gender(data.gender);
    import_web_sdk.default.add_birthday(new Date(data.dob));
    import_web_sdk.default.add_user_attribute("user_id", userId);
    import_web_sdk.default.add_user_attribute("name", name);
    import_web_sdk.default.add_user_attribute("email", data.email);
    import_web_sdk.default.add_user_attribute("gender", data.gender);
    import_web_sdk.default.add_user_attribute("birth_date", new Date(data.dob));
    import_web_sdk.default.add_user_attribute("created_at", data.c_at);
    import_web_sdk.default.add_user_attribute("age", calculateAge(data.dob));
    import_web_sdk.default.add_user_attribute(
      "organization_id",
      data.organizationId
    );
    import_web_sdk.default.add_user_attribute("is_premium_user", data.subscription);
  }, 1e3);
};
var moengageTrackUser = (property, payload) => {
  if (!import_web_sdk.default) {
    return null;
  }
  switch (property) {
    case MOENGAGE_PROPERTY.ADD_USER_SESSION:
      return import_web_sdk.default.add_unique_user_id(payload.userId);
    case MOENGAGE_PROPERTY.UPDATE_USER_SESSION:
      return import_web_sdk.default.update_unique_user_id(payload.userId);
    case MOENGAGE_PROPERTY.REMOVE_USER_SESSION:
      return import_web_sdk.default.destroy_session();
    default:
      return null;
  }
};
var moengageTrackEvent = (property, payload) => {
  if (!import_web_sdk.default) {
    return null;
  }
  switch (property) {
    case MOENGAGE_PROPERTY.OPEN_ALBUM_OR_PLAYLIST:
      return import_web_sdk.default.track_event(property, {
        type: payload.type,
        title: payload.title,
        speaker_name: payload.speaker_name
      });
    case MOENGAGE_PROPERTY.SEARCH:
      return import_web_sdk.default.track_event(property, {
        keyword: payload.keyword
      });
    case MOENGAGE_PROPERTY.PLAY_AUDIO:
      return import_web_sdk.default.track_event(property, {
        source: payload.source,
        title: payload.title,
        album_title: payload.album_title,
        speaker_name: payload.speaker_name
      });
    case MOENGAGE_PROPERTY.LOGIN:
      return import_web_sdk.default.track_event(property, {
        login_platform: payload.login_platform,
        success_status: payload.success_status,
        email_address: payload.email_address
      });
    case MOENGAGE_PROPERTY.LOGOUT:
      return import_web_sdk.default.track_event(property, {
        logout_date: payload.logout_date,
        success_status: payload.success_status,
        forced_logout: payload.forced_logout
      });
    case MOENGAGE_PROPERTY.SIGNUP:
      return import_web_sdk.default.track_event(property, {
        signup_platform: payload.signup_platform,
        email_address: payload.email_address,
        success_status: payload.success_status,
        referral_code: payload.referral_code,
        dob: payload.dob,
        gender: payload.gender
      });
    case MOENGAGE_PROPERTY.OPEN_VIDEO:
      return import_web_sdk.default.track_event(property, {
        video_title: payload.video_title,
        video_id: payload.video_id,
        video_type: payload.video_type,
        video_artist: payload.video_artist
      });
    case MOENGAGE_PROPERTY.PLAY_VIDEO:
      return import_web_sdk.default.track_event(property, {
        video_title: payload.video_title,
        video_id: payload.video_id,
        video_type: payload.video_type,
        video_artist: payload.video_artist,
        video_source: payload.video_source
      });
    case MOENGAGE_PROPERTY.OPEN_STS:
      return import_web_sdk.default.track_event(property, {
        sts_title: payload.sts_title,
        sts_id: payload.sts_id,
        sts_artist: payload.sts_artist
      });
    case MOENGAGE_PROPERTY.OPEN_LEARNING_PATH:
      return import_web_sdk.default.track_event(property, {
        learning_path_title: payload.learning_path_title,
        learning_path_id: payload.learning_path_id,
        learning_path_artist: payload.learning_path_artist
      });
    case MOENGAGE_PROPERTY.PLAY_INSPIMIX:
      return import_web_sdk.default.track_event(property, {
        source: payload.source
      });
    default:
      return null;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MOENGAGE_AUTH_SOURCE,
  MOENGAGE_GENDER,
  MOENGAGE_PROPERTY,
  calculateAge,
  initializeUserSession,
  moengageTrackEvent,
  moengageTrackUser
});
