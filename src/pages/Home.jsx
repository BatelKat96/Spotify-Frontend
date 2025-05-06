import { useEffect, useRef, useState } from 'react'
import { PlaylistList } from '../cmps/PlaylistList'

import data from '../data/HomePagePlaylist.json'


export function Home() {
    useEffect(() => {
        console.log('data:', data)
    }, [])


    const [sectionWidth, setSectionWidth] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const sectionElement = sectionRef.current
        if (!sectionElement) return

        const resizeObserver = new ResizeObserver((entries) => {
            // for (let entry of entries) {
            //     setSectionWidth(entry.contentRect.width)
            // }
            const entry = entries[0]
            setSectionWidth(entry.contentRect.width)
        })

        resizeObserver.observe(sectionElement)

        return () => {
            resizeObserver.unobserve(sectionElement);
        }
    }, [])



    return (
        <section className='home' ref={sectionRef}>
            <h3>Pop</h3>
            <PlaylistList playlists={data.pop} width={sectionWidth} />
            <h3>Hip-hop</h3>
            <PlaylistList playlists={data.hiphop} width={sectionWidth} />
            <h3>Latin</h3>
            <PlaylistList playlists={data.latin} width={sectionWidth} />
            <h3>Decades</h3>
            <PlaylistList playlists={data.decades} width={sectionWidth} />

        </section >
    )
}
