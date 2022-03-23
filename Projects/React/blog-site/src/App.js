import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import './App.css';
import TopPosts from './Components/TopPosts';
import LatestArticle from './Components/LatestArticels';
import TheLatest from './Components/TheLatest';
import VerticalGallery from './Components/VerticalGallery';
import VerticalGallerySingleTile from './Components/VerticalGallerySingleTile';
import Advertisemtn from './Components/Advertisemtn';
import LatestStories from './Components/LatestStories';
import Blog from './Components/Blog';
import Header from './Components/Header';
import HomeLayout from './Components/HomeLayout';
import Bollywood from './Components/BollywoodLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<><Header /><Outlet /></>}>
          <Route index element={<HomeLayout />} />
          <Route path='home' element={<Navigate to='/' />} />
          <Route path='bollywood' element={<Bollywood />} />
          <Route path='technology' element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
