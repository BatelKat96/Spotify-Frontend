export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const ADD_PLAYLIST_MSG = 'ADD_PLAYLIST_MSG'

const initialState = {
    playlists: [],
    playlist: null
}

export function playlistReducer(state = initialState, action) {
    var newState = state
    var playlists
    switch (action.type) {
        case SET_PLAYLISTS:
            newState = { ...state, playlists: action.playlists }
            break
        case SET_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        case REMOVE_PLAYLIST:
            playlists = state.playlists.filter(playlist => playlist._id !== action.playlistId)
            newState = { ...state, playlists }
            break
        case ADD_PLAYLIST:
            newState = { ...state, playlists: [...state.playlists, action.playlist] }
            break
        case UPDATE_PLAYLIST:
            playlists = state.playlists.map(playlist => (playlist._id === action.playlist._id) ? action.playlist : playlist)
            newState = { ...state, playlists }
            break
        default:
    }
    return newState
}


