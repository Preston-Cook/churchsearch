import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import Overlay from './Overlay';
import Menu from './Menu';
import useScreenSize from '../hooks/useScreenSize';
import logo from '../assets/logo.png';
import logoGradient from '../assets/logo-gradient.png';
import BASE_API_ENDPOINT from '../config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState(false);
  const { accessToken, logout, roles } = useAuth();

  const { width } = useScreenSize();

  const navigate = useNavigate();

  async function handleLogOut() {
    const res = await fetch(`${BASE_API_ENDPOINT}/auth/log-out`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const res2 = await fetch(`${BASE_API_ENDPOINT}/auth/refresh`);

      if (!res2.ok) {
        navigate('/log-in');
      }

      const data2 = await res2.json();
      const { accessToken: accessToken2 } = data2;

      await fetch(`${BASE_API_ENDPOINT}/auth/log-out`, {
        headers: {
          Authorization: `Bearer ${accessToken2}`,
        },
      });
    }

    logout();
    navigate('/');
  }

  function handleIsOpen() {
    setIsOpen(prev => !prev);
  }

  function handleOverlayClose() {
    setIsOpen(false);
  }

  useEffect(
    function () {
      if (width >= 768) {
        setIsOpen(false);
      }
    },
    [width]
  );

  useEffect(
    function () {
      const handleScroll = () => {
        if (window.scrollY > 0 && scroll) {
          return;
        }

        setScroll(prev => !prev);
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    },
    [scroll]
  );

  return (
    <>
      <Overlay open={isOpen} onOpen={handleOverlayClose} />
      <Menu open={isOpen} onOpen={handleIsOpen} />
      <nav
        onClick={() => (isOpen ? setIsOpen(false) : null)}
        className={`fixed z-[5000] flex w-full items-center justify-between gap-6 bg-transparent px-10 py-4 ${
          scroll ? 'text-[#6AAEBD]' : 'text-white'
        } transition-colors ${scroll ? 'bg-white' : ''} ${
          scroll ? 'border-b-2 border-[#6AAEBD]' : ''
        }`}
      >
        <h1 className="basis-1/5 text-3xl duration-300">
          <Link to="/">
            <div className="lg:w-[300px] md:w-[200px] w-[175px]">
              <img
                src={scroll ? logoGradient : logo}
                className="object-center w-full"
              />
            </div>
          </Link>
        </h1>
        <ul className="hidden basis-4/5 list-none items-center justify-end gap-8 text-sm md:flex lg:text-lg">
          <li className="underline-animation py-1">
            <Link to="/search">Find Churches</Link>
          </li>
          {roles?.includes('admin') ? (
            <li>
              <Link to="/manage">
                <Button>
                  <p>Manage App</p>
                </Button>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/add-church">
                <Button>
                  <p>Add Your Church</p>
                </Button>
              </Link>
            </li>
          )}
          {accessToken === null ? (
            <>
              <li className="underline-animation py-1">
                <Link to="sign-up">Sign Up</Link>
              </li>
              <li className="underline-animation py-1">
                <Link to="log-in">Log In</Link>
              </li>
            </>
          ) : (
            <li
              className="underline-animation py-1 cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </li>
          )}
        </ul>
        <div
          className={`md:hidden ${scroll ? 'text-[#6AAEBD]' : 'text-white'}`}
        >
          <Hamburger toggled={isOpen} toggle={handleIsOpen} />
        </div>
      </nav>
    </>
  );
}
