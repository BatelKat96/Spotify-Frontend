import { NavLink } from 'react-router-dom';

export function AppHeader() {
    return (
        <section className='app-header'>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="search">Search</NavLink>
            </nav>
        </section >
    )
}
