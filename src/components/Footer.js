import { Link } from 'react-router-dom';
import { ReactComponent as Tg } from '../assets/tg.svg';
import { ReactComponent as Github } from '../assets/github.svg';
import { ReactComponent as In } from '../assets/in.svg';

export function Footer() {
  return (
    <footer className="pt-24 pb-5 mt-auto">
      <div className="flex gap-5 items-center justify-center mb-4">
        <Link to="https://t.me/denis_palitsyn" target="_blank">
          <Tg className="hover:scale-110 hover:-rotate-12 transition-all duration-500 rounded-full" />
        </Link>
        <Link to="https://github.com/DenisPalitsyn" target="_blank">
          <Github className="hover:scale-110 hover:-rotate-12 transition-all duration-500" />
        </Link>
        <Link
          to="https://www.linkedin.com/in/denis-palitsyn-5984a6255/"
          target="_blank"
        >
          <In className="hover:scale-110 hover:-rotate-12 transition-all duration-500" />
        </Link>
      </div>
      <div className="text-center text-xs text-orange-500">
        Made by Denis Palitsyn
      </div>
    </footer>
  );
}
