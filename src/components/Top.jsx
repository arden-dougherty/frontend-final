import React, { useEffect, useState } from "react";
import axios from "axios";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const url = "/adventurelookup/api/adventures?sortBy=reviews";

const Top = () => {
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
    const monsterCount = {};

    adventures.forEach((adventure) => {
      adventure.common_monsters.forEach((monster) => {
        monsterCount[monster] = (monsterCount[monster] || 0) + 1;
      });
    });

    const monsters = Object.keys(monsterCount).map((monster) => ({
      label: monster,
      value: monsterCount[monster],
    }));

    const sorted = monsters.sort((a, b) => b.value - a.value);
    const top10 = sorted.slice(0, 10);

    console.log(monsters);

    const monsterData = {
      labels: top10.map((monster) => monster.label),
      datasets: [
        {
          label: "Adventures",
          data: top10.map((monster) => monster.value),
          backgroundColor: "#ff3333",
          borderColor: "#cc0000",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Top monsters in adventures",
          font: {
            size: 24,
          },
          padding: {
            bottom: 20,
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Monster",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "# of adventures",
          },
        },
      },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-5">Top monsters in adventures</h1>
        <br />
        <div
          className="chart-container d-flex justify-content-center align-items-center"
          style={{ position: "relative", height: "70vh", width: "70vw" }}
        >
          <Bar
            className="mb-5 ms-5 me-5"
            data={monsterData}
            options={options}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default Top;
