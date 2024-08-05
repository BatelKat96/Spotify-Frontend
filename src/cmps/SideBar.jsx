import { NavLink } from 'react-router-dom';
import { Library } from './Library';

export function SideBar() {
    return (
        <section className='side-bar'>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="search">Search</NavLink>
            </nav>
            <Library />
        </section >
    )
}
