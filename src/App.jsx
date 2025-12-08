import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import Top from "./components/Top.jsx";
import Search from "./components/Search.jsx";
import Editions from "./components/Editions.jsx";

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 h-15 flex p-3 gap-3">
        <Link
          className="rounded-md px-3 pt-1 text-lg text-gray-300 hover:bg-white/5 hover:text-white"
          to="/"
        >
          Home
        </Link>
        <Link
          className="rounded-md px-3 pt-1 text-lg text-gray-300 hover:bg-white/5 hover:text-white"
          to="/search"
        >
          Search
        </Link>
        <Link
          className="rounded-md px-3 pt-1 text-lg text-gray-300 hover:bg-white/5 hover:text-white"
          to="/top"
        >
          Monsters
        </Link>
        <Link
          className="rounded-md px-3 pt-1 text-lg text-gray-300 hover:bg-white/5 hover:text-white"
          to="/editions"
        >
          Editions
        </Link>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home title="Home" />} />
        <Route exact path="/top" element={<Top title="Top" />} />
        <Route exact path="/search" element={<Search title="Search" />} />
        <Route exact path="/editions" element={<Editions title="Editions" />} />
      </Routes>
    </Router>
  );
}

export default App;
