import React, { useState } from "react";
import { Laptop, SquareCode, Layers, CornerUpLeft } from "lucide-react";

const Skills = () => {
  const [activeView, setActiveView] = useState("overview");

  const skillsData = {
    frontend: {
      title: "Front-End",
      icon: Laptop,
      description:
        "Front-End Developer with expertise in HTML, CSS, and JavaScript. Strong at combining aesthetics and functionality to deliver smooth, engaging user experiences.",
      skills: [
        { name: "HTML5", image: "/public/images/6.png" },
        { name: "CSS3", image: "/public/images/2.png" },
        { name: "JavaScript", image: "/public/images/5.png" },
        { name: "ReactJS", image: "/public/images/9.png" },
        { name: "Tailwind CSS", image: "/public/images/3.png" },
      ],
    },
    backend: {
      title: "Back-End",
      icon: SquareCode,
      description:
        "Back-End Developer skilled in Node.js, Express, and React, with experience in database management using MongoDB and MySQL. Proficient in HTML, CSS, and JavaScript to support full-stack development.",
      skills: [
        { name: "NodeJS", image: "/public/images/8.png" },
        { name: "Git", image: "/public/images/7.png" },
        { name: "MongoDB", image: "/public/images/4.svg" },
        { name: "ExpressJS", image: "/public/images/10.webp" },
      ],
    },
  };

  const allSkills = [
    ...skillsData.frontend.skills,
    ...skillsData.backend.skills,
  ];

  return (
    <section
      className="relative flex w-full h-screen overflow-hidden items-center justify-center bg-gradient-to-br from-black via-red-950 to-black"
      id="my-skills"
    >
      {/* Home Button */}
      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        aria-label="Go to Home"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center text-white p-2 rounded-md border-2 border-red-500 bg-black/70 shadow-sm shadow-red-600/30 transition-all duration-200 hover:bg-red-900 hover:shadow-md hover:scale-105 cursor-pointer"
      >
        <CornerUpLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Title */}
      <h2 className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40 text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
        My Skills{" "}
        <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
          💪
        </span>
      </h2>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{
            width:
              activeView === "overview"
                ? "33.33%"
                : activeView === "frontend"
                ? "66.66%"
                : "100%",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        {/* Overview View */}
        {activeView === "overview" && (
          <div className="animate-fade-in w-full max-w-6xl h-[70vh] flex flex-col items-center justify-center gap-8 p-8 md:p-12 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

            <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] text-center">
              Full Stack Development
            </h1>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {/* Frontend Card */}
              <button
                onClick={() => setActiveView("frontend")}
                className="group relative p-8 rounded-[20px] border-2 border-red-600/50 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <Laptop className="w-16 h-16 text-red-500 group-hover:text-red-400 transition-colors" />
                  <h3 className="text-2xl font-bold text-white">Front-End</h3>
                  <p className="text-gray-300 text-center text-sm">
                    Building beautiful & responsive user interfaces
                  </p>
                </div>
              </button>

              {/* Backend Card */}
              <button
                onClick={() => setActiveView("backend")}
                className="group relative p-8 rounded-[20px] border-2 border-red-600/50 bg-black/60 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <SquareCode className="w-16 h-16 text-red-500 group-hover:text-red-400 transition-colors" />
                  <h3 className="text-2xl font-bold text-white">Back-End</h3>
                  <p className="text-gray-300 text-center text-sm">
                    Creating robust server-side solutions
                  </p>
                </div>
              </button>
            </div>

            {/* All Skills Preview */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 max-w-4xl">
              {allSkills.slice(0, 6).map((skill, index) => (
                <div
                  key={index}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg border border-red-600/30 bg-black/40 p-2 backdrop-blur-sm opacity-70"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frontend View */}
        {activeView === "frontend" && (
          <div className="animate-fade-in w-full max-w-5xl h-[70vh] flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <Laptop className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                  Front-End
                </h1>
              </div>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 max-w-xl">
                {skillsData.frontend.description}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="relative z-10 flex-1 grid grid-cols-3 gap-4 md:gap-6">
              {skillsData.frontend.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-xl border-2 border-red-600/30 bg-black/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-110"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <span className="text-white font-semibold text-sm text-center">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backend View */}
        {activeView === "backend" && (
          <div className="animate-fade-in w-full max-w-5xl h-[70vh] flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <SquareCode className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
                  Back-End
                </h1>
              </div>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 max-w-xl">
                {skillsData.backend.description}
              </p>
            </div>

            {/* Skills Grid */}
            <div className="relative z-10 flex-1 grid grid-cols-3 gap-4 md:gap-6">
              {skillsData.backend.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative aspect-square rounded-xl border-2 border-red-600/30 bg-black/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-110"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                    <span className="text-white font-semibold text-sm text-center">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center">
        <button
          onClick={() =>
            setActiveView(
              activeView === "overview"
                ? "backend"
                : activeView === "frontend"
                ? "overview"
                : "frontend"
            )
          }
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &lt;
        </button>

        {/* View Indicators */}
        <div className="flex gap-2">
          {["overview", "frontend", "backend"].map((view, index) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`h-2 rounded-full transition-all duration-300 ${
                view === activeView
                  ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  : "w-2 bg-gray-500 hover:bg-red-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setActiveView(
              activeView === "overview"
                ? "frontend"
                : activeView === "frontend"
                ? "backend"
                : "overview"
            )
          }
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &gt;
        </button>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute top-20 md:top-24 right-4 md:right-8 z-40 flex flex-col gap-3">
        {["overview", "frontend", "backend"].map((view, index) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
              view === activeView
                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-110 bg-black/60"
                : "border-red-600/30 hover:border-red-500 opacity-60 hover:opacity-100 bg-black/40"
            }`}
          >
            {view === "overview" ? (
              <Layers className="w-8 h-8 text-red-500" />
            ) : view === "frontend" ? (
              <Laptop className="w-8 h-8 text-red-500" />
            ) : (
              <SquareCode className="w-8 h-8 text-red-500" />
            )}
            {view === activeView && (
              <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[1px]"></div>
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Skills;
