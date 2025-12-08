import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const url = "/adventurelookup/api/adventures?page=";

let allAdventures = [];

const Editions = () => {
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
    const editionCount = {};

    adventures.forEach((adventure) => {
      editionCount[adventure.edition] =
        (editionCount[adventure.edition] || 0) + 1;
    });

    const editions = Object.keys(editionCount)
      .map((edition) => ({
        label: edition,
        value: editionCount[edition],
      }))
      .sort((a, b) => b.value - a.value);

    const editionData = {
      labels: editions.map((edition) => edition.label),
      datasets: [
        {
          label: "Adventures",
          data: editions.map((edition) => edition.value),
          backgroundColor: [
            "oklch(70.4% 0.191 22.216)",
            "oklch(75% 0.183 55.934)",
            "oklch(82.8% 0.189 84.429)",
            "oklch(85.2% 0.199 91.936)",
            "oklch(84.1% 0.238 128.85)",
            "oklch(79.2% 0.209 151.711)",
            "oklch(76.5% 0.177 163.223)",
            "oklch(77.7% 0.152 181.912)",
            "oklch(78.9% 0.154 211.53)",
            "oklch(74.6% 0.16 232.661)",
            "oklch(70.7% 0.165 254.624)",
            "oklch(67.3% 0.182 276.935)",
          ],
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Edition breakdown of adventures",
          font: {
            size: 24,
          },
          padding: {
            bottom: 20,
          },
        },
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center m-5 bg-gray-100 shadow rounded-lg">
          <h1 className="m-5 text-center text-3xl">
            Number of adventures by edition/system
          </h1>
          <div className="flex justify-center w-[70vw] h-[70vh] mb-5">
            <Pie
              className="mb-5 ms-5 me-5"
              data={editionData}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default Editions;
