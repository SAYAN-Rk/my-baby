import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProposalPage from './pages/ProposalPage';
import TeddyPage from './pages/TeddyPage';
import SlideshowPage from './pages/SlideshowPage';
import PlaylistPage from './pages/PlaylistPage';
import './globals.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProposalPage />} />
        <Route path="/teddy" element={<TeddyPage />} />
        <Route path="/slideshow" element={<SlideshowPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
