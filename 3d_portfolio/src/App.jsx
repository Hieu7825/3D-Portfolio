// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HeroSection from "./pages/HeroSection";
import AboutMe from "./pages/AboutMe";
import Project from "./pages/Project";
import Skills from "./pages/Skills";
import ContactQualifications from "./pages/ContactQualifications";
import SnakeGame from "./pages/SnakeGame";
import Game2048 from "./pages/Game2048";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HeroSection" element={<HeroSection />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/my-skills" element={<Skills />} />
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route path="/2048-game" element={<Game2048 />} />
        <Route
          path="/contact-qualifications"
          element={<ContactQualifications />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
