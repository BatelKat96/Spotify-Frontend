import { useEffect, useState } from 'react';
import { PlaylistPreview } from './PlaylistPreview';

export function PlaylistList({ playlists, width }) {

    const [visiblePlaylists, setVisiblePlaylists] = useState([])

    useEffect(() => {
        const minPlaylistWidth = 160
        const numberOfPlaylists = Math.floor(width / minPlaylistWidth)
        setVisiblePlaylists(playlists.slice(0, numberOfPlaylists))
    }, [width])


    return (
        <div className='playlist-list'>
            {visiblePlaylists.map(playlist =>
                <article className='playlist-preview' key={playlist._id}>
                    <PlaylistPreview playlist={playlist} />
                </article>
            )}
        </div >
    )
}