import { Route, Routes } from 'react-router';
import { AppHeader } from './cmps/AppHeader';
import { Search } from './pages/Search';
import { StationDetails } from './pages/StationDetails';
import { StationIndex } from './pages/StationIndex';
import { SideBar } from './cmps/SideBar';
import { AppFooter } from './cmps/AppFooter';

export function App() {
  return (
    <div className="main-layout">
      <SideBar />

      <main>
        <AppHeader />
        <Routes>
          <Route path="" element={<StationIndex />} />
          <Route path="/station/:stationId" element={<StationDetails />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </main>

      <AppFooter />
    </div>
  )
}


