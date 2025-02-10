import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import TipsPrep from "./components/TipsAndPrep/TipsPrep";

const App = () => {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden text-[#2b2b2b]">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tips-prep" element={<TipsPrep />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/resources" element={<Resources />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;
