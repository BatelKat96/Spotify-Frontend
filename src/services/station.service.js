import { storageService } from './async-storage.service'
import { userService } from './user'
import { makeId } from './util.service'

const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    createStation
}
window.cs = stationService


async function query() {
    let stations = await storageService.query(STORAGE_KEY)
    if (!stations) stations = _createStations()
    saveToStorage(STORAGE_KEY, stations)
    return stations
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    var savedStation
    if (station._id) {
        const stationToSave = {
            _id: station._id,
            title: station.title,
            songs: station.songs,
            desc: station.desc,
        }
        savedStation = await storageService.put(STORAGE_KEY, stationToSave)
    } else {
        const stationToSave = {
            title: station.title,
            songs: station.songs,
            desc: station.desc,
            owner: userService.getLoggedinUser(),
            songs: station.songs,
        }
        savedStation = await storageService.post(STORAGE_KEY, stationToSave)
    }
    return savedStation
}

function _createStations() {
    [
        {
            _id: makeId(),
            title: 'Funky Monks',
            imgUrl: 'https://robohash.org?1',
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
            imgUrl: 'https://robohash.org?2',
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

function createStation(title, imgUrl, desc) {
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