function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-5">
      <h1 className="text-3xl text-center">
        Welcome to the D&D 5e dashboard app!
      </h1>
      <p>
        This application visualizes data about prewritten Dungeons and Dragons
        adventure modules.{" "}
      </p>
      <p>Powered by:</p>
      <a
        href="https://adventurelookup.com/api"
        className="bg-gray-700 text-white font-bold rounded-xl px-3 py-1"
      >
        Adventure Lookup API
      </a>
      <a
        href="https://www.dnd5eapi.co/"
        className="bg-gray-700 text-white font-bold rounded-xl px-3 py-1"
      >
        D&D 5e API
      </a>
    </div>
  );
}

export default Home;
