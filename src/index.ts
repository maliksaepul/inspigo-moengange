import moengage from '@moengage/web-sdk';

// Utils
export const calculateAge = dob => {
    //@ts-ignore
    const diffMs = Date.now() - new Date(dob)
    const age = new Date(diffMs)
    return Math.abs(age.getUTCFullYear() - 1970)
}

export const MOENGAGE_PROPERTY = {
    ADD_USER_SESSION: 'add_user_session',
    REMOVE_USER_SESSION: 'remove_user_session',
    UPDATE_USER_SESSION: 'update_user_session',
    OPEN_ALBUM_OR_PLAYLIST: 'Open Album or Playlist',
    PLAY_AUDIO: 'Play Audio',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    SIGNUP: 'Register',
    SEARCH: 'Keyword Search',
    OPEN_VIDEO: 'Open Video',
    PLAY_VIDEO: 'Play Video',
    OPEN_STS: 'Open STS',
    OPEN_LEARNING_PATH: 'Open Learning Path',
    PLAY_INSPIMIX: 'Play InspiMix',
}

export const MOENGAGE_AUTH_SOURCE = {
    FORM: 'form',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
}

export const MOENGAGE_GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
}

export const initializeUserSession = data => {
    const userId = data.id
    const name = data.name

    setTimeout(() => {

        moengageTrackUser(MOENGAGE_PROPERTY.ADD_USER_SESSION, { userId }) 
        moengage.add_first_name(name.split(' ').slice(0, -1).join(' '))
        moengage.add_last_name(name.split(' ').slice(-1).join(' '))
        moengage.add_email(data.email)
        moengage.add_mobile(data.phone)
        moengage.add_gender(data.gender)
        moengage.add_birthday(new Date(data.dob))

        moengage.add_user_attribute('user_id', userId)
        moengage.add_user_attribute('name', name)
        moengage.add_user_attribute('email', data.email)
        moengage.add_user_attribute('gender', data.gender)
        moengage.add_user_attribute('birth_date', new Date(data.dob))
        moengage.add_user_attribute('created_at', data.c_at)
        moengage.add_user_attribute('age', calculateAge(data.dob))
        moengage.add_user_attribute(
            'organization_id',
            data.organizationId,
        )
        moengage.add_user_attribute('is_premium_user', data.subscription)
    }, 1000)
}

export const moengageTrackUser = (property, payload) => {
    if (!moengage) {
        return null
    }

    switch (property) {
        case MOENGAGE_PROPERTY.ADD_USER_SESSION:
            return moengage.add_unique_user_id(payload.userId)

        case MOENGAGE_PROPERTY.UPDATE_USER_SESSION:
            return moengage.update_unique_user_id(payload.userId)

        case MOENGAGE_PROPERTY.REMOVE_USER_SESSION:
            return moengage.destroy_session()

        default:
            return null
    }
}

export const moengageTrackEvent = (property, payload) => {
    if (!moengage) {
        return null
    }

    switch (property) {
        case MOENGAGE_PROPERTY.OPEN_ALBUM_OR_PLAYLIST:
            return moengage.track_event(property, {
                type: payload.type,
                title: payload.title,
                speaker_name: payload.speaker_name,
            })

        case MOENGAGE_PROPERTY.SEARCH:
            return moengage.track_event(property, {
                keyword: payload.keyword,
            })

        case MOENGAGE_PROPERTY.PLAY_AUDIO:
            return moengage.track_event(property, {
                source: payload.source,
                title: payload.title,
                album_title: payload.album_title,
                speaker_name: payload.speaker_name,
            })

        case MOENGAGE_PROPERTY.LOGIN:
            return moengage.track_event(property, {
                login_platform: payload.login_platform,
                success_status: payload.success_status,
                email_address: payload.email_address,
            })

        case MOENGAGE_PROPERTY.LOGOUT:
            return moengage.track_event(property, {
                logout_date: payload.logout_date,
                success_status: payload.success_status,
                forced_logout: payload.forced_logout,
            })

        case MOENGAGE_PROPERTY.SIGNUP:
            return moengage.track_event(property, {
                signup_platform: payload.signup_platform,
                email_address: payload.email_address,
                success_status: payload.success_status,
                referral_code: payload.referral_code,
                dob: payload.dob,
                gender: payload.gender,
            })
        case MOENGAGE_PROPERTY.OPEN_VIDEO:
            return moengage.track_event(property, {
                video_title: payload.video_title,
                video_id: payload.video_id,
                video_type: payload.video_type,
                video_artist: payload.video_artist,
            })
        case MOENGAGE_PROPERTY.PLAY_VIDEO:
            return moengage.track_event(property, {
                video_title: payload.video_title,
                video_id: payload.video_id,
                video_type: payload.video_type,
                video_artist: payload.video_artist,
                video_source: payload.video_source,
            })
        case MOENGAGE_PROPERTY.OPEN_STS:
            return moengage.track_event(property, {
                sts_title: payload.sts_title,
                sts_id: payload.sts_id,
                sts_artist: payload.sts_artist,
            })
        case MOENGAGE_PROPERTY.OPEN_LEARNING_PATH:
            return moengage.track_event(property, {
                learning_path_title: payload.learning_path_title,
                learning_path_id: payload.learning_path_id,
                learning_path_artist: payload.learning_path_artist,
            })
        case MOENGAGE_PROPERTY.PLAY_INSPIMIX:
            return moengage.track_event(property, {
                source: payload.source,
            })
        default:
            return null
    }
}
