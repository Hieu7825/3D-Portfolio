import { CornerUpLeft } from "lucide-react";
import React, { useState, useRef } from "react";
import ProjectCard from "../components/ProjectCard";

const Project = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  const runTimeOutRef = useRef(null);

  const projectData = [
    {
      id: 1,
      videoSrc: "/public/videos/project1.mp4",
      title: "Bookstore",
      gradientText: "Management Platform",
      description:
        "Bookstore Management Platform is a web-based system that helps bookstores efficiently manage inventory, orders, invoices, staff, and finances all in one place.",
      link: "https://github.com/LionelHuanSi/HUSTBOOK",
    },
    {
      id: 2,
      videoSrc: "/public/videos/project2.mp4",
      title: "Online",
      gradientText: "Fast Food Website",
      description:
        "HustFood is an online food ordering system developed by students of Hanoi University of Science and Technology. The system leverages AI technology to provide users with an intelligent and convenient food ordering experience.",
      link: "https://github.com/IncuksukEi/HustFood1.0.0",
    },
    {
      id: 3,
      videoSrc: "/public/videos/project3.mp4",
      title: "Movie",
      gradientText: "Ticket Booking",
      description:
        "Huso is a web app for exploring movies, booking seats online, and includes smart seat holding with an admin dashboard for managing films and bookings.",
      link: "https://github.com/Hieu7825/Huso",
    },
  ];

  const showProject = (type) => {
    let newIndex = activeProject;
    if (type === "next") {
      newIndex = (activeProject + 1) % projectData.length;
      setTransitionClass("next");
    } else {
      newIndex = (activeProject - 1 + projectData.length) % projectData.length;
      setTransitionClass("prev");
    }
    setActiveProject(newIndex);

    if (runTimeOutRef.current) {
      clearTimeout(runTimeOutRef.current);
    }
    runTimeOutRef.current = setTimeout(() => {
      setTransitionClass("");
    }, 500);
  };

  const currentProject = projectData[activeProject];

  return (
    <section
      className="relative flex w-full h-screen overflow-hidden items-center justify-center bg-gradient-to-br from-black via-red-950 to-black"
      id="my-project"
    >
      {/* Nút Home ở góc trên trái */}
      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        aria-label="Go to Home"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center text-white p-2 rounded-md border-2 border-red-500 bg-black/70 shadow-sm shadow-red-600/30 transition-all duration-200 hover:bg-red-900 hover:shadow-md hover:scale-105 cursor-pointer"
      >
        <CornerUpLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Main Project Display */}
      <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        {/* Large Project Card with transition */}
        <div
          className={`project-container relative w-full max-w-6xl h-[75vh] transition-all duration-500 ${
            transitionClass === "next"
              ? "animate-slide-left"
              : transitionClass === "prev"
              ? "animate-slide-right"
              : ""
          }`}
        >
          <ProjectCard
            videoSrc={currentProject.videoSrc}
            title={currentProject.title}
            gradientText={currentProject.gradientText}
            description={currentProject.description}
            link={currentProject.link}
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center">
        <button
          onClick={() => showProject("prev")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &lt;
        </button>

        {/* Project Indicators */}
        <div className="flex gap-2">
          {projectData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeProject
                  ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  : "w-2 bg-gray-500 hover:bg-red-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => showProject("next")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &gt;
        </button>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute top-20 md:top-24 right-4 md:right-8 z-40 flex flex-col gap-3">
        {projectData.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(index)}
            className={`group relative w-20 h-16 md:w-24 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              index === activeProject
                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-110"
                : "border-red-600/30 hover:border-red-500 opacity-60 hover:opacity-100"
            }`}
          >
            <video
              src={project.videoSrc}
              muted
              loop
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            ></video>
            {index === activeProject && (
              <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[1px]"></div>
            )}
            {/* Project Number Badge */}
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md font-bold">
              #{index + 1}
            </div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{
            width: `${((activeProject + 1) / projectData.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Title */}
      <h2 className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40 text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
        My Projects{" "}
        <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
          👨‍💻
        </span>
      </h2>
    </section>
  );
};

export default Project;
