import axios from 'axios';
import { loadFromStorage, saveToStorage } from './util.service';

export const spotifyService = {
    getSpotifyData,
    getCategory
}

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const TOKEN_KEY = 'spotifyAccessToken'

// getSpotifyData('categoryPlaylists', '0JQ5DAqbMKFEC4WFtoNRpw')
// getSpotifyData('playlist', '37i9dQZF1DX9sLipKPkV9T')
// getSpotifyData('tracks', '37i9dQZF1DX9sLipKPkV9T')

async function getSpotifyData(reqType, id, searchType) {

    const endpoints = {
        categoryPlaylists: `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=il`,
        playlist: `https://api.spotify.com/v1/playlists/${id}`,
        tracks: `https://api.spotify.com/v1/playlists/${id}/tracks`, //tracks inside the playlist
        search: `https://api.spotify.com/v1/search?q=${id}&type=${searchType}`,
    }

    try {
        let accessToken
        const token = loadFromStorage(TOKEN_KEY)

        if (!token || _tokenIsExpired(token.expirationTime)) {
            accessToken = await _getAccessToken()
        } else accessToken = token.accessToken

        const res = await axios.get(endpoints[reqType], {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        console.log('res.data:', res.data)

    }
    catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message)
    }
}


async function _getAccessToken() {
    try {
        // Encode client credentials (Client ID and Client Secret)
        const credentials = `${clientId}:${clientSecret}`
        // const encodedCredentials = Buffer.from(credentials).toString('base64') //// for backend
        const encodedCredentials = btoa(credentials)

        // Make a POST request to the token endpoint
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${encodedCredentials}`,
                },
            }
        )
        const { data } = response
        const accessToken = data.access_token
        const expiresIn = data.expires_in
        const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
        const token = { accessToken, expirationTime }
        saveToStorage(TOKEN_KEY, token)
        return accessToken
    } catch (error) {
        console.error(
            'Error retrieving access token:',
            error.response ? error.response.data : error.message
        )
        throw error
    }
}



function _tokenIsExpired(expirationTime) {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expirationTime;
}


function getCategory() {
    return [
        {
            id: '0JQ5DAt0tbjZptfcdMSKl3',
            imgUrl: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
            name: "Made for you"
        },
        {
            id: '0JQ5DAqbMKFz6FAsUtgAab',
            imgUrl: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
            name: 'New Releses'
        },
        {
            id: '0JQ5DAqbMKFEC4WFtoNRpw',
            imgUrl: "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
            name: 'Pop'
        }
        ,
        {
            id: '0JQ5DAqbMKFQ00XGBls6ym',
            imgUrl: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
            name: 'Hip-Hop'
        }
        ,
        {
            id: '0JQ5DAqbMKFDXXwE9BDJAr',
            imgUrl: "https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg",
            name: 'Rock'
        }
        ,

        {
            id: '0JQ5DAqbMKFxXaXKP7zcDp',
            imgUrl: "https://t.scdn.co/media/derived/latin-274x274_befbbd1fbb8e045491576e317cb16cdf_0_0_274_274.jpg",
            name: 'Latin'
        }
        ,
        {
            id: '0JQ5DAudkNjCgYMM0TZXDw',
            imgUrl: "https://charts-images.scdn.co/spotify-charts-logos/music_charts_search_arrow_274x274.jpeg",
            name: 'Charts'
        }
        ,
        {
            id: '0JQ5DAqbMKFHOzuVTgTizF',
            imgUrl: "https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg",
            name: 'Dance/Electroni'
        }
        ,
        {
            id: '0JQ5DAqbMKFzHmL4tf05da',
            imgUrl: "https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg",
            name: 'Mood'
        }
        ,
        {
            id: '0JQ5DAqbMKFCWjUTdzaG0e',
            imgUrl: "https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg",
            name: 'Indie'
        }
        ,
        {
            id: '0JQ5DAqbMKFAXlCG6QvYQ4',
            imgUrl: "https://t.scdn.co/media/links/workout-274x274.png"
            , name: 'Workout'
        }
        ,
        {
            id: '0JQ5DAtOnAEpjOgUKwXyxj',
            imgUrl: "https://t.scdn.co/images/728ed47fc1674feb95f7ac20236eb6d7.jpeg",
            name: 'Discover'
        }
        ,
        {
            id: '0JQ5DAqbMKFKLfwjuJMoNC',
            imgUrl: "https://t.scdn.co/images/a2e0ebe2ebed4566ba1d8236b869241f.jpeg",
            name: 'Country'
        }
        ,
        {
            id: '0JQ5DAqbMKFEZPnFQSFB1T',
            imgUrl: "https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg",
            name: 'RnB'
        }
        ,
        {
            id: '0JQ5DAqbMKFGvOw3O4nLAf',
            imgUrl: "https://t.scdn.co/images/2078afd91e4d431eb19efc5bee5ab131.jpeg",
            name: 'K-pop'
        }
        ,
        {
            id: '0JQ5DAqbMKFFzDl7qN9Apr',
            imgUrl: "https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg",
            name: "Chill"
        }
        ,
        {
            id: '0JQ5DAqbMKFCuoRTxhYWow',
            imgUrl: "https://t.scdn.co/media/derived/sleep-274x274_0d4f836af8fab7bf31526968073e671c_0_0_274_274.jpg",
            name: 'Sleep'
        }
        ,
        {
            id: '0JQ5DAqbMKFA6SOHvT3gck',
            imgUrl: "https://t.scdn.co/images/7ee6530d5b3c4acc9a0957046bf11d63",
            name: 'Party'
        }
        ,
        {
            id: '0JQ5DAqbMKFx0uLQR2okcc',
            imgUrl: "https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg",
            name: 'At Home'
        }
        ,
        {
            id: '0JQ5DAqbMKFIVNxQgRNSg0',
            imgUrl: "https://t.scdn.co/images/04111a3b810243288d81a539ba03f8d0",
            name: 'Decades'
        }
    ]
}


