import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
    </main>
  );
};

export default App;
