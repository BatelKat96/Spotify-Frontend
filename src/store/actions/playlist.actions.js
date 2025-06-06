import { playlistService } from '../../services/playlist.service.js'
import { store } from '../store'
import { ADD_PLAYLIST, REMOVE_PLAYLIST, SET_PLAYLISTS, SET_PLAYLIST, UPDATE_PLAYLIST } from '../reducers/playlist.reducer'

export async function loadPlaylists(filterBy) {
    try {
        const playlists = await playlistService.query(filterBy)
        store.dispatch(getCmdSetPlaylists(playlists))
    } catch (err) {
        console.log('Cannot load playlists', err)
        throw err
    }
}

export async function loadPlaylist(playlistId) {
    try {
        const playlist = await playlistService.getById(playlistId)
        store.dispatch(getCmdSetPlaylist(playlist))
    } catch (err) {
        console.log('Cannot load playlist', err)
        throw err
    }
}


export async function removePlaylist(playlistId) {
    try {
        await playlistService.remove(playlistId)
        store.dispatch(getCmdRemovePlaylist(playlistId))
    } catch (err) {
        console.log('Cannot remove playlist', err)
        throw err
    }
}

export async function addPlaylist(playlist) {
    try {
        const savedPlaylist = await playlistService.save(playlist)
        store.dispatch(getCmdAddPlaylist(savedPlaylist))
        return savedPlaylist
    } catch (err) {
        console.log('Cannot add playlist', err)
        throw err
    }
}

export async function updatePlaylist(playlist) {
    try {
        const savedPlaylist = await playlistService.save(playlist)
        store.dispatch(getCmdUpdatePlaylist(savedPlaylist))
        return savedPlaylist
    } catch (err) {
        console.log('Cannot save playlist', err)
        throw err
    }
}


// Command Creators:
function getCmdSetPlaylists(playlists) {
    return {
        type: SET_PLAYLISTS,
        playlists
    }
}
function getCmdSetPlaylist(playlist) {
    return {
        type: SET_PLAYLIST,
        playlist
    }
}
function getCmdRemovePlaylist(playlistId) {
    return {
        type: REMOVE_PLAYLIST,
        playlistId
    }
}
function getCmdAddPlaylist(playlist) {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
}
function getCmdUpdatePlaylist(playlist) {
    return {
        type: UPDATE_PLAYLIST,
        playlist
    }
}