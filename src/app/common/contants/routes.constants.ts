export const API_ROUTES = {
    BASE: '/',
    FACTS: {
        GET_ALL: 'facts/getFacts',
        GET_BY_ID: 'facts/getFact',
        GET_BY_STREETCODE_ID: 'facts/getFactsByStreetcodeId',
        CREATE: 'facts/createFact',
        UPDATE: 'facts/updateFact',
        DELETE: 'facts/deleteFact',
    },
    PARTNERS: {
        GET_ALL: 'partners/getPartners',
        GET_SPONSORS: 'partners/getSponsors',
        GET_BY_ID: 'partners/getPartner',
        CREATE: 'partners/createPartner',
        UPDATE: 'partners/updatePartner',
        DELETE: 'partners/deletePartner',
    },
    STREETCODES: {
        GET_ALL: 'streetcodes/getStreetcodes',
        GET_EVENTS: 'streetcodes/getPersons',
        GET_PERSONS: 'streetcodes/getEvents',
        GET_BY_ID: 'streetcodes/getStreetcode',
        //GET_BY_TEASER: 'streetcodes/getStreetcodeByTeaser',
        GET_BY_INDEX: 'streetcodes/getStreetcodeByIndex',
        CREATE: 'streetcodes/createStreetcode',
        UPDATE: 'streetcodes/updateStreetcode',
        DELETE: 'streetcodes/deleteStreetcode',
    },
    SUBTITLES: {
        GET_ALL: 'subtitles/getSubtitles',
        GET_BY_STREETCODE_ID: 'subtitles/getSubtitlesByStreetcodeId',
        GET_BY_ID: 'subtitles/getSubtitle',
        CREATE: 'subtitles/createSubtitle',
        UPDATE: 'subtitles/updateSubtitle',
        DELETE: 'subtitles/deleteSubtitle',
    },
    TAGS: {
        GET_ALL: 'partners/getPartners',
        GET_BY_ID: 'fact/getPartner',
        GET_BY_TITLE: 'fact/getPartner',
        GET_BY_STREETCODE_ID: '',
        CREATE: 'partners/createFact',
        UPDATE: 'fact/updateFact',
        DELETE: 'fact/deleteFact',
    },
    TERMS: {
        GET_ALL: 'partners/getPartners',
        GET_BY_ID: 'fact/getPartner',
        CREATE: 'partners/createFact',
        UPDATE: 'fact/updateFact',
        DELETE: 'fact/deleteFact',
    },
    TEXTS: {
        GET_ALL: 'partners/getPartners',
        GET_BY_ID: 'fact/getPartner',
        //GET_NEXT: 'partners/createFact',
        UPDATE: 'fact/updateFact',
        DELETE: 'fact/deleteFact',
    },
    TIMELINE: {
        GET_ALL: 'partners/getPartners',
        GET_BY_ID: 'fact/getPartner',
        CREATE: 'partners/createFact',
        UPDATE: 'fact/updateFact',
        DELETE: 'fact/deleteFact',
    },
    TRANSACTION_LINKS: {
        GET_ALL: 'partners/getPartners',
        GET_SPONSORS: 'partners/getSponsors',
        GET_BY_ID: 'fact/getPartner',
        GET_BY_TITLE: 'fact/getPartner',
        CREATE: 'partners/createFact',
        UPDATE: 'fact/updateFact',
        DELETE: 'fact/deleteFact',
    },
    MEDIA: {
        GET_VIDEO_BY_ID: 'media/getVideo',
        CREATE_VIDEO:'media/uploadVideo',
        DELETE_VIDEO:'media/deleteVideo',
        GET_AUDIO_BY_ID:'media/getAudio',
        CREATE_AUDIO:'media/uploadAudio',
        DELETE_AUDIO:'media/deleteAudio'
    },
}