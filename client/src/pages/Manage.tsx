import { useEffect, useState } from 'react';
import BASE_API_ENDPOINT from '../config';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Manage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [churches, setChurches] = useState<Church[]>([]);

  useEffect(function () {
    async function getChurches() {
      setIsLoading(true);
      const res = await fetch(`${BASE_API_ENDPOINT}/churches`);
      const data = await res.json();
      setChurches(data.data as Church[]);
      setIsLoading(false);
    }

    getChurches();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#a7d3dd] to-[#e9c4be] py-32">
      <div className="w-[80%] max-w-[600px] bg-white mx-auto rounded-2xl shadow-xl px-8 py-6">
        <h1 className="pb-2 text-center text-3xl font-semibold text-[#6AAEBD] opacity-100 md:text-4xl">
          Manage Churches
        </h1>
        <hr />
        <div className="text-center mt-8">
          <Link to="/manage/create">
            <Button>Create Church</Button>
          </Link>
        </div>
        <div className="my-8">
          {isLoading ? (
            <div className="w-fit mx-auto">
              <Spinner />
            </div>
          ) : (
            churches.map(church => (
              <div key={church._id} className="text-center">
                <div className="underline-animation text-lg my-2 w-fit mx-auto pb-1 text-[#9AA3AF]">
                  <Link to={`/manage/${church._id}`}>{church.name}</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
