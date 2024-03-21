import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query) {
      return;
    }
    navigate(`/search?q=${query}`);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(() => e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-5 sm:px-10 w-[95%] rounded-2xl bg-white py-2 md:max-w-[50%] my-4 border-gray-300 border flex"
    >
      <input
        className="flex-1 focus:outline-none"
        name="q"
        type="text"
        placeholder={'Search...'}
        value={query}
        onChange={handleChange}
        autoFocus
      />
      <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="#9BA3AF" />
      </button>
    </form>
  );
}
