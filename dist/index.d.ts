declare const calculateAge: (dob: any) => number;
declare const MOENGAGE_PROPERTY: {
    ADD_USER_SESSION: string;
    REMOVE_USER_SESSION: string;
    UPDATE_USER_SESSION: string;
    OPEN_ALBUM_OR_PLAYLIST: string;
    PLAY_AUDIO: string;
    LOGIN: string;
    LOGOUT: string;
    SIGNUP: string;
    SEARCH: string;
    OPEN_VIDEO: string;
    PLAY_VIDEO: string;
    OPEN_STS: string;
    OPEN_LEARNING_PATH: string;
    PLAY_INSPIMIX: string;
};
declare const MOENGAGE_AUTH_SOURCE: {
    FORM: string;
    GOOGLE: string;
    FACEBOOK: string;
};
declare const MOENGAGE_GENDER: {
    MALE: string;
    FEMALE: string;
};
declare const initializeUserSession: (data: any) => void;
declare const moengageTrackUser: (property: any, payload: any) => any;
declare const moengageTrackEvent: (property: any, payload: any) => any;

export { MOENGAGE_AUTH_SOURCE, MOENGAGE_GENDER, MOENGAGE_PROPERTY, calculateAge, initializeUserSession, moengageTrackEvent, moengageTrackUser };
