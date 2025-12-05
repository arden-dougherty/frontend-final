import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import axios from "axios";

import capitalize from "../utils/utils";
import Monster from "./Monster";

const url = "/adventurelookup/api/adventures?page=";

let allAdventures = [];

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
    const pages = 172;

    for (let page = 1; page < pages; ++page) {
      axios
        .get(`${url}${page}`)
        .then((response) => {
          setData(response.data.adventures);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  allAdventures.push(...data);

  const ids = allAdventures.map((adventure) => adventure.id);
  const uniqueIds = Array.from(new Set(ids));
  const adventures = uniqueIds.map((id) =>
    allAdventures.find((adventure) => adventure.id === id)
  );

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
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-2xl">Featured in these adventures:</h2>
        <div className="flex flex-col flex-wrap gap-3">
          {adventuresFiltered.map((adventure) => (
            <div className="rounded shadow bg-gray-100">
              <div className="flex flex-col gap-3 m-3">
                <h2 className="font-bold text-lg">{adventure.title}</h2>
                <p>{`${adventure.description.substring(0, 200)}...`}</p>
                <hr className="border-1 border-gray-300" />
                <div className="flex flex-wrap justify-evenly gap-3">
                  <p className="bg-gray-700 text-white font-bold rounded-xl px-3 py-1">
                    {adventure.edition}
                  </p>
                  <p className="bg-gray-700 text-white font-bold rounded-xl px-3 py-1">
                    Starting Level:{" "}
                    {adventure.min_starting_level ===
                    adventure.max_starting_level
                      ? adventure.min_starting_level
                      : `${adventure.min_starting_level}-${adventure.max_starting_level}`}
                  </p>
                  <p className="bg-gray-700 text-white font-bold rounded-xl px-3 py-1">
                    {adventure.setting}
                  </p>
                </div>
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
      <h1 className="text-3xl text-center">
        Enter a monster to start searching:
      </h1>
      <div>
        <input
          type="search"
          id="searchBar"
          placeholder="Search"
          className="border border-neutral-200 rounded bg-gray-100 px-3 py-2 mx-3"
        />
        <SearchButton />
      </div>
      <div className="flex flex-wrap gap-5">
        <div id="monsterRoot" className="max-w-150"></div>
        <div id="adventureRoot" className="max-w-150"></div>
      </div>
    </div>
  );
};

export default Search;
