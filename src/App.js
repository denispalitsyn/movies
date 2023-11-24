import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { MainPage, MoviePage, SearchPage } from './pages';
import { Header } from './components';

import './index.css';

let timer;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState('');

  const onSearchInputChange = (event) => {
    const value = event.target.value;

    setSearch(value);

    clearTimeout(timer);

    timer = setTimeout(
      () => navigate(value ? `/search?q=${value}` : '/'),
      1000
    );
  };

  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearch('');
    }

    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header search={search} onSearchInputChange={onSearchInputChange} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
