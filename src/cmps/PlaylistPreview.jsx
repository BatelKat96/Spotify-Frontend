export function PlaylistPreview({ playlist }) {

    function detectLanguage(txt) {
        const hebrewPattern = /[\u0590-\u05FF]/;

        if (hebrewPattern.test(txt)) {
            return 'rtl';
        }
    };

    return (
        <div style={{ direction: detectLanguage(playlist.title) }}>
            <img src={playlist.imgUrl} />
            <p className='playlist-title'>{playlist.title}</p>
            <p className='playlist-description'>{playlist.description}</p>
        </div >
    )
}