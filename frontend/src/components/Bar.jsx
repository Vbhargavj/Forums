import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
const useDebounce = (value, timeout) => {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [value, timeout]);

  return debounceVal;
};

export function Bar() {
  const [filter, setFilter] = useState('');
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    // Avoid triggering search when the component first mounts
    if (debouncedFilter) {
      axios.get(`http://localhost:3000/api/v1/forum/forums?title=${debouncedFilter}`)
        .then(response => console.log(response))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [debouncedFilter]);

  return (
    <nav className="bg-gray-800 p-2">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="flex items-center space-x-16">
          <div className="text-white text-lg font-bold"><a href='/home'>MySite</a></div>
          <ul className="flex space-x-9">
            <li><a href="/home" className="text-white hover:text-gray-400">Home</a></li>
            <li><a href="/about-us" className="text-white hover:text-gray-400">About</a></li>
            <li><a href="/contact-us" className="text-white hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        <div className="flex items-center px-5 space-x-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            placeholder="Search..."
            className="px-4 py-1 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Link to="/profile" className="flex items-center space-x-2">
            <div className="rounded-full h-8 w-8 bg-slate-200 flex items-center justify-center">
              <div className="text-xl text-white">B</div>
            </div>
            <div className="text-white">Hello</div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Bar;
