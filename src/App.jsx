import { Route, Routes } from 'react-router';
import { AppHeader } from './cmps/AppHeader';
import { Search } from './pages/Search';
import { PlaylistDetails } from './pages/PlaylistDetails';
import { Home } from './pages/Home';
import { SideBar } from './cmps/SideBar';
import { AppFooter } from './cmps/AppFooter';

export function App() {
  return (
    <div className="main-layout">
      <SideBar />

      <main>
        <AppHeader />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </main>

      <AppFooter />
    </div>
  )
}


