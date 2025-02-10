import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import TipsPrep from "./components/TipsPrep";

const App = () => {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tips-prep" element={<TipsPrep />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
