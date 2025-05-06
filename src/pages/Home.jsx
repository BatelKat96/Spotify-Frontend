import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { PlaylistList } from '../cmps/PlaylistList'
import { loadPlaylists } from '../store/actions/playlist.actions'


export function Home() {

    const playlists = useSelector(storeState => storeState.playlistModule.playlists)

    useEffect(() => {
        loadPlaylists()
    }, [])


    console.log('playlists:', playlists)

    return (
        <section className='home'>
            <PlaylistList playlists={playlists} />
        </section >
    )
}
