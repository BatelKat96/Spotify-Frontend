import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { makeId, makeLorem, saveToStorage } from './util.service'

const STORAGE_KEY = 'playlist'

export const playlistService = {
    query,
    getById,
    save,
    remove,
    createPlaylist
}
window.cs = playlistService


async function query() {
    let playlists = await storageService.query(STORAGE_KEY)
    console.log('playlists:', playlists)
    if (!playlists.length) playlists = _createPlaylists()
    saveToStorage(STORAGE_KEY, playlists)
    return playlists
}

function getById(playlistId) {
    return storageService.get(STORAGE_KEY, playlistId)
}

async function remove(playlistId) {
    await storageService.remove(STORAGE_KEY, playlistId)
}

async function save(playlist) {
    var savedPlaylist
    if (playlist._id) {
        const playlistToSave = {
            _id: playlist._id,
            title: playlist.title,
            songs: playlist.songs,
            desc: playlist.desc,
        }
        savedPlaylist = await storageService.put(STORAGE_KEY, playlistToSave)
    } else {
        const playlistToSave = {
            title: playlist.title,
            songs: playlist.songs,
            desc: playlist.desc,
            owner: userService.getLoggedinUser(),
            songs: playlist.songs,
        }
        savedPlaylist = await storageService.post(STORAGE_KEY, playlistToSave)
    }
    return savedPlaylist
}

function _createPlaylists() {
    return [
        {
            _id: makeId(),
            title: 'Funky Monks',
            imgUrl: 'https://robohash.org/1',
            desc: makeLorem(15),
            tags: [
                'Funk',
                'Happy'
            ],
            createdBy: {
                _id: 'u101',
                fullname: 'Lily Jackson',
                imgUrl: 'https://robohash.org?set=set4/4'
            },
            likedByUsers: [
                {
                    _id: 'u101',
                    fullname: 'Lily Jackson',
                    imgUrl: 'https://robohash.org?set=set4/4'
                }, {
                    _id: 'u102',
                    fullname: 'Dani James',
                    imgUrl: 'https://robohash.org?set=set4/5'
                }],
            songs: [
                {
                    id: 's1001',
                    title: 'The Meters - Cissy Strut',
                    url: 'youtube/song.mp4',
                    imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
                    addedAt: 162521765262
                },
                {
                    id: 'mUkfiLjooxs',
                    title: 'The JBs - Pass The Peas',
                    url: 'youtube/song.mp4',
                    imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
                    addedAt: 162521767262
                },
            ]
        },
        {
            _id: makeId(),
            title: 'Top Hip Hop',
            imgUrl: 'https://robohash.org/2',
            desc: makeLorem(13),
            tags: [
                'Hiphop',
                'Party'
            ],
            createdBy: {
                _id: 'u101',
                fullname: 'Lily Jackson',
                imgUrl: 'https://robohash.org?set=set4/4'
            },
            likedByUsers: [
                {
                    _id: 'u101',
                    fullname: 'Lily Jackson',
                    imgUrl: 'https://robohash.org?set=set4/4'
                }, {
                    _id: 'u102',
                    fullname: 'Dani James',
                    imgUrl: 'https://robohash.org?set=set4/5'
                }],
            songs: [
                {
                    id: 's1001',
                    title: 'The Meters - Cissy Strut',
                    url: 'youtube/song.mp4',
                    imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
                    addedAt: 162521765262
                },
                {
                    id: 'mUkfiLjooxs',
                    title: 'The JBs - Pass The Peas',
                    url: 'youtube/song.mp4',
                    imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
                    addedAt: 162521767262
                },
            ]
        }
    ]
}

function createPlaylist(title, imgUrl, desc) {
    return {
        title: title,
        imgUrl: imgUrl || 'https://robohash.org?1',
        desc: desc || makeLorem(15),
        tags: [
            'Funk',
            'Happy'
        ],
        createdBy: {
            _id: 'u101',
            fullname: 'Lily Jackson',
            imgUrl: 'https://robohash.org?set=set4/4'
        },
        likedByUsers: [],
        songs: []
    }
}