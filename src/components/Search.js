import { useEffect, useRef } from 'react';

export default function Search({ query, setQuery }) {
  // useEffect(function () {
  //   const el = document.querySelector('.search');
  //   console.log(el);
  //   el.focus();
  // }, []);

  const inputElement = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        inputElement.current.focus();
        if (e.code === 'Enter') {
          inputElement.current.focus();
          setQuery('');
        }

        if (document.activeElement === inputElement.current) return;
      }
      document.addEventListener('keydown', callback);

      return () => document.removeEventListener('keydown', callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
