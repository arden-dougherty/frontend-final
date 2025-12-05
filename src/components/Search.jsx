import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import axios from "axios";

import capitalize from "../utils/utils";
import Monster from "./Monster";

const url = "/adventurelookup/api/adventures?sortBy=reviews";

function SearchButton() {
  function handleClick() {
    const searchBar = document.getElementById("searchBar");
    const searchStr = searchBar.value;

    const adventureRoot = createRoot(document.getElementById("adventureRoot"));
    const monsterRoot = createRoot(document.getElementById("monsterRoot"));
    adventureRoot.render(<SearchMonster monster={searchStr} />);
    monsterRoot.render(<Monster monster={searchStr} />);
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

function SearchMonster(props) {
  const monsterLower = props.monster.toLowerCase();
  const monster = capitalize(monsterLower);

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

  try {
    const adventuresFiltered = adventures.filter((adventure) => {
      if (
        adventure.common_monsters.includes(monster) ||
        adventure.boss_monsters.includes(monster)
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col flex-wrap gap-3">
          {adventuresFiltered.map((adventure) => (
            <div className="border rounded shadow">
              <div className="p-3">
                <h2 className="font-bold text-lg">{adventure.title}</h2>
                <p>Edition: {adventure.edition}</p>
                <p>Starting Level Range: {adventure.starting_level_range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

const Search = () => {
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
      <div className="flex gap-5">
        <div id="adventureRoot"></div>
        <div id="monsterRoot" className="max-w-150"></div>
      </div>
    </div>
  );
};

export default Search;
