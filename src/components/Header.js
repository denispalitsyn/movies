import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from '../utils';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Input } from './Input';

export function Header({ search, onSearchInputChange }) {
  const [isHeaderFloat, setIsHeaderFloat] = useState(false);

  useEffect(() => {
    const onScroll = debounce(() => {
      if (window.scrollY > 100) {
        setIsHeaderFloat(true);
      } else {
        setIsHeaderFloat(false);
      }
    }, 50);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isHeaderFloat ? 'bg-black' : 'bg-transparent'
      } h-20 fixed top-0 left-0 right-0 z-10 transition-all duration-500`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <Link to={'/'}>
            <Logo className="hover:scale-110 hover:-rotate-12 transition-all duration-500" />
          </Link>
          <div className="text-2xl font-bold text-orange-500">Filmfo</div>
        </div>
        <Input value={search} onChange={onSearchInputChange} />
      </div>
    </header>
  );
}
