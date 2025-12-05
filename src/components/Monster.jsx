import React, { useEffect, useState } from "react";
import axios from "axios";
import Fraction from "fraction.js";

import capitalize from "../utils/utils";

// this function fetches monster data from the 5e api and returns a statblock as jsx
const Monster = function renderMonster(props) {
  const monster = props.monster.toLowerCase().replaceAll(" ", "-");
  const url = `https://www.dnd5eapi.co/api/2014/monsters/${monster}/`;

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

  try {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="rounded shadow p-3 bg-orange-50 text-red-900">
        <h2 className="text-3xl font-bold">{data.name}</h2>
        <p className="italic">
          {data.size} {capitalize(data.type)}
          {"subtype" in data ? ` (${capitalize(data.subtype)})` : ""},{" "}
          {capitalize(data.alignment)}
        </p>
        <hr className="mb-2 mt-2 border-2" />
        <p>
          <strong>Armor Class:</strong> {data.armor_class[0].value}{" "}
          {armorString(data.armor_class[0])}
        </p>
        <p>
          <strong>Hit Points:</strong> {data.hit_points}{" "}
          {`(${data.hit_points_roll})`}
        </p>
        <p>
          <strong>Speed:</strong> {data.speed.walk}
        </p>
        <hr className="mb-1 mt-2 border-2" />
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <p className="font-bold">STR</p>
            <p>
              {data.strength} {`(${modifier(data.strength)})`}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">DEX</p>
            <p>
              {data.dexterity} {`(${modifier(data.dexterity)})`}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">CON</p>
            <p>
              {data.constitution} {`(${modifier(data.constitution)})`}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">INT</p>
            <p>
              {data.intelligence} {`(${modifier(data.intelligence)})`}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">WIS</p>
            <p>
              {data.wisdom} {`(${modifier(data.wisdom)})`}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">CHA</p>
            <p>
              {data.charisma} {`(${modifier(data.charisma)})`}
            </p>
          </div>
        </div>
        <hr className="mb-1 mt-2 border-2" />
        <SavingThrows proficiencies={data.proficiencies} />
        <Skills proficiencies={data.proficiencies} />
        <DamageVulnerabilities types={data.damage_vulnerabilities} />
        <DamageResistances types={data.damage_resistances} />
        <DamageImmunities types={data.damage_immunities} />
        <p>
          <strong>Senses</strong>{" "}
          {Object.entries(data.senses)
            .map(
              (sense) =>
                `${capitalize(sense[0].replaceAll("_", " "))} ${sense[1]}`
            )
            .join(", ")}
        </p>
        <p>
          <strong>Languages</strong>{" "}
          {data.languages.length !== 0 ? `${data.languages}` : "-"}
        </p>
        <p>
          <strong>Challenge</strong>{" "}
          {new Fraction(data.challenge_rating).toFraction()}{" "}
          {`(${new Intl.NumberFormat().format(data.xp)} XP)`}{" "}
          <strong>Proficiency Bonus</strong> {`+${data.proficiency_bonus}`}
        </p>
        <hr className="mb-1 mt-2 border-2" />
        <Traits traits={data.special_abilities} />
        <Actions actions={data.actions} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

// this function converts an ability score into an ability modifier
const modifier = function calculateStatModifier(stat) {
  const rawMod = Math.floor((stat - 10) / 2);

  if (rawMod >= 0) return `+${rawMod}`;
  else return rawMod;
};

// this function returns a string based on the type of armor a monster has
const armorString = function armorClassToString(armorClass) {
  if (armorClass.type === "armor")
    return `(${armorClass.armor
      .map((item) => item.name)
      .join(", ")
      .toLowerCase()})`;
  else if (armorClass.type === "natural") return "(natural armor)";
  else return "";
};

// this function takes a list of proficiencies and returns a string with only the saving throws
const saveString = function savingThrowsFromProficiencies(proficiencies) {
  return proficiencies
    .filter((item) => item.proficiency.index.includes("saving"))
    .map((item) => `${item.proficiency.name.slice(-3)} +${item.value}`)
    .join(", ");
};

// this function takes a list of proficiencies and returns a string with only the skills
const skillString = function skillsFromProficiencies(proficiencies) {
  return proficiencies
    .filter((item) => item.proficiency.index.includes("skill"))
    .map((item) => `${item.proficiency.name.slice(7)} +${item.value}`)
    .join(", ");
};

const Speed = function renderSpeed(props) {
  return (
    <p>
      <strong>Speed:</strong> {data.speed.walk}
    </p>
  );
};

const SavingThrows = function renderSavingThrows(props) {
  const str = saveString(props.proficiencies);
  if (str !== "")
    return (
      <p>
        <strong>Saving Throws</strong> {str}
      </p>
    );
};

const Skills = function renderSkills(props) {
  const str = skillString(props.proficiencies);
  if (str !== "")
    return (
      <p>
        <strong>Skills</strong> {str}
      </p>
    );
};

const DamageVulnerabilities = function renderDamageVulnerabilities(props) {
  const types = props.types;
  if (types.length !== 0)
    return (
      <p>
        <strong>Damage Vulnerabilities</strong> {capitalize(types.join(", "))}
      </p>
    );
};

const DamageResistances = function renderDamageResistances(props) {
  const types = props.types;
  if (types.length !== 0)
    return (
      <p>
        <strong>Damage Resistances</strong> {capitalize(types.join(", "))}
      </p>
    );
};

const DamageImmunities = function renderDamageImmunities(props) {
  const types = props.types;
  if (types.length !== 0)
    return (
      <p>
        <strong>Damage Immunities</strong> {capitalize(types.join(", "))}
      </p>
    );
};

const Traits = function renderTraits(props) {
  const traits = props.traits;
  if (traits.length !== 0)
    return (
      <div>
        {traits.map((trait) => (
          <p className="py-1">
            <strong className="italic">{trait.name}.</strong> {trait.desc}
          </p>
        ))}
      </div>
    );
};

const Actions = function renderActions(props) {
  const actions = props.actions;
  if (actions.length !== 0)
    return (
      <div>
        <h3 className="text-xl">Actions</h3>
        <hr className="mb-2" />
        {actions.map((action) => (
          <p>
            <strong className="italic">{action.name}.</strong> {action.desc}
          </p>
        ))}
      </div>
    );
};

export default Monster;
