import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import BASE_API_ENDPOINT from '../config';

export default function Menu({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen(): void;
}) {
  const navigate = useNavigate();
  const { accessToken, logout, roles } = useAuth();

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

  return (
    <div
      className={`${
        !open ? 'pointer-events-none opacity-0' : 'opacity-100'
      } fixed left-10 right-10 top-36 h-[60vh] rounded-3xl shadow-2xl bg-white py-10 text-center transition-all duration-300 z-[10000]`}
    >
      <h2 className="pb-4 text-3xl font-semibold text-[#6AAEBD]">
        ChurchSearch
      </h2>
      <div className="w-[90%] mx-auto">
        <hr />
      </div>
      <ul className="flex h-[80%] flex-col items-center justify-around pt-6 text-xl text-[#6AAEBD]">
        <li className="underline-animation w-fit py-1">
          <Link to="/search" onClick={onOpen}>
            Find Churches
          </Link>
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
        {accessToken !== null ? (
          <li
            className="underline-animation py-1 cursor-pointer"
            onClick={() => {
              handleLogOut();
              onOpen();
            }}
          >
            Log Out
          </li>
        ) : (
          <>
            <li className="underline-animation w-fit py-1">
              <Link to="/sign-up" onClick={onOpen}>
                Sign Up
              </Link>
            </li>
            <li className="underline-animation w-fit py-1">
              <Link to="/log-in" onClick={onOpen}>
                Log In
              </Link>
            </li>
          </>
        )}
      </ul>
      <p className="mt-6 text-stone-300">
        Copyright &copy; ChurchSearch &nbsp;
        {new Date().getFullYear()}
      </p>
    </div>
  );
}
