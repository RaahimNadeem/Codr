import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import TipsPrep from "./components/TipsAndPrep/TipsPrep";
import Companies from "./components/Companies";
import ResourcesPage from "./components/Resources/ResourcesPage";

const App = () => {
  return (
    <Router>
      <main className="relative min-h-screen w-screen overflow-x-hidden text-[#2b2b2b]">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tips-prep" element={<TipsPrep />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/resources" element={<ResourcesPage />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;
