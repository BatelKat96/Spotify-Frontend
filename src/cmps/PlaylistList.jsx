import { PlaylistPreview } from './PlaylistPreview';

export function PlaylistList({ playlists }) {
    return (
        <div className='playlist-list'>
            {playlists.map(playlist =>
                <article className='playlist-preview' key={playlist._id}>
                    <PlaylistPreview playlist={playlist} />
                </article>
            )}
        </div >
    )
}