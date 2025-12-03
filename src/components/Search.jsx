import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

const url = "/adventurelookup/api/adventures?sortBy=reviews";

function SearchButton() {
  function handleClick() {
    const searchBar = document.getElementById("searchBar");
    const searchStr = searchBar.value;

    const searchRoot = createRoot(document.getElementById("searchRoot"));
    searchRoot.render(<SearchMonster />);
  }

  return (
    <button
      className="rounded bg-gray-800 text-gray-200 px-3 py-2 hover:bg-gray-700 hover:text-white"
      id="searchButton"
      onClick={handleClick}
    >
      Search
    </button>
  );
}

const SearchMonster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const adventures = data.adventures;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col flex-wrap gap-3">
        {adventures.map((adventure) => (
          <div className="rounded shadow-lg">
            <div className="p-3">
              <img src={adventure.thumbnail_url} width="200" />
              <h2>{adventure.title}</h2>
              <p>{adventure.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const adventures = data.adventures;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="text-4xl">Adventure Search</h1>
      <h2 className="text-xl">Search for a monster below to get started:</h2>
      <div>
        <input
          type="search"
          id="searchBar"
          placeholder="Search"
          className="border border-neutral-200 rounded bg-neutral-100 px-3 py-2 mx-3"
        />
        <SearchButton />
      </div>
      <div id="searchRoot"></div>
    </div>
  );

  /*
  return (
    <div className="flex flex-col items-center">
      <h1 className="m-5">Adventures by Monster</h1>
      <br />
      <div className="flex flex-col flex-wrap gap-3">
        {adventures.map((adventure) => (
          <div className="rounded shadow-lg">
            <div className="p-3">
              <img src={adventure.thumbnail_url} width="200" />
              <h2>{adventure.title}</h2>
              <p>{adventure.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  */
};

export default Search;
