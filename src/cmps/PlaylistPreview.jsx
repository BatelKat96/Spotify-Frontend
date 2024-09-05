export function PlaylistPreview({ playlist }) {
    return (
        <>
            <img src={playlist.imgUrl} />
            <p>{playlist.title}</p>
        </ >
    )
}