import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import Top from "./components/Top.jsx";

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
          to="/top"
        >
          Top
        </Link>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home title="Home" />} />
        <Route exact path="/top" element={<Top title="Top" />} />
      </Routes>
    </Router>
  );
}

export default App;
