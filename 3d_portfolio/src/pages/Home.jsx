import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);

  // Cấu hình các thẻ với route tương ứng
  const menuItems = [
    { id: 1, title: "Hero Section", route: "/HeroSection" },
    { id: 2, title: "About Me", route: "/AboutMe" },
    { id: 3, title: "Projects", route: "/projects" },
    { id: 4, title: "Skills", route: "/my-skills" },
    { id: 5, title: "Contact", route: "/contact-qualifications" },
    { id: 6, title: "Snake Game", route: "/snake-game" },
    { id: 7, title: "Game 2048", route: "/2048-game" },
  ];

  // Tính toán góc xoay dựa trên số lượng items
  const itemCount = menuItems.length;
  const angleStep = 360 / itemCount;

  // Giữ translateZ cố định như code cũ để các items cách nhau đều
  const translateZ = 380;

  const handleCardClick = (route) => {
    setCurrentRoute(route);
    setShowVideo(true);
    setIsPaused(true);
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo]);

  const handleVideoEnd = () => {
    if (currentRoute) {
      navigate(currentRoute);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-radial from-red-900/20 via-black to-black"></div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-[100px] animate-pulse-slower"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[90px] animate-pulse-slow"></div>

        {/* Falling Dust Particles - Chỉ rơi ở giữa màn hình */}
        {[...Array(75)].map((_, i) => {
          const leftPosition = 25 + Math.random() * 50; // 25% đến 75% (giữa màn hình)
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full animate-falling-dust"
              style={{
                left: `${leftPosition}%`,
                top: `-${Math.random() * 20}%`, // Bắt đầu từ trên màn hình
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`, // 3-7 giây
                opacity: Math.random() * 0.6 + 0.2,
              }}
            ></div>
          );
        })}

        {/* Light Rays */}
        <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-red-500/40 via-transparent to-transparent blur-sm animate-ray-1"></div>
        <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-orange-500/30 via-transparent to-transparent blur-sm animate-ray-2"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-500/30 via-transparent to-transparent blur-sm animate-ray-3"></div>
      </div>

      {/* Video Overlay */}
      {showVideo && (
        <div className="fixed inset-0 z-[2000] bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            playsInline
          >
            <source src="/videos/hoatanh.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-8 left-8 z-[100] w-12 h-12 bg-black/80 border-2 border-red-600 rounded-lg flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:bg-red-900/80 hover:scale-110 hover:shadow-lg hover:shadow-red-600/70 backdrop-blur-sm"
      >
        <span className="w-6 h-0.5 bg-red-600 transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-red-600 transition-all duration-300"></span>
        <span className="w-6 h-0.5 bg-red-600 transition-all duration-300"></span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r-4 border-red-600 z-[99] transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-[0_0_50px_rgba(220,38,38,0.5)]`}
      >
        <div className="p-8 h-full overflow-y-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">
            MENU
          </h2>
          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  handleCardClick(item.route);
                  setIsSidebarOpen(false);
                }}
                className="w-full p-4 bg-black/80 border-2 border-red-600 rounded-xl text-lg font-bold text-white cursor-pointer transition-all duration-300 shadow-md shadow-red-600/50 uppercase tracking-wider hover:bg-red-900/80 hover:scale-105 hover:shadow-xl hover:shadow-red-600/70 hover:border-red-400 hover:-translate-x-2 active:scale-100 backdrop-blur-sm"
                style={{
                  animation: isSidebarOpen
                    ? `slideIn 0.3s ease-out ${index * 0.05}s both`
                    : "none",
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[98] transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Banner */}
      <div className="w-full h-screen text-center relative">
        {/* 3D Rotating Slider */}
        <div
          ref={sliderRef}
          className={`absolute w-[140px] h-[180px] top-[15%] left-1/2 -translate-x-1/2 z-[2] ${
            isPaused ? "animate-paused" : "animate-autoRotate"
          }`}
          style={{ transformStyle: "preserve-3d" }}
          onMouseEnter={() => !showVideo && setIsPaused(true)}
          onMouseLeave={() => !showVideo && setIsPaused(false)}
        >
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${
                  index * angleStep
                }deg) translateZ(${translateZ}px)`,
              }}
            >
              <button
                onClick={() => handleCardClick(item.route)}
                className="w-full h-full bg-black/80 border-4 border-red-600 rounded-[20px] text-[1.3em] font-bold text-white cursor-pointer transition-all duration-300 shadow-lg shadow-red-600/50 backdrop-blur-md uppercase tracking-[2px] hover:bg-red-900/80 hover:scale-110 hover:shadow-xl hover:shadow-red-600/70 hover:border-red-400 active:scale-105 hover:-translate-y-2"
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end items-center z-[1] pointer-events-none">
          {/* Model Image - Behind text */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[75vh] bg-no-repeat bg-bottom"
            style={{
              backgroundImage: "url(/images/nguoi.png)",
              backgroundSize: "contain",
              zIndex: 3,
              filter:
                "brightness(1.1) drop-shadow(0 0 40px rgba(255, 100, 100, 0.4)) drop-shadow(0 0 20px rgba(255, 150, 100, 0.3))",
            }}
          />

          {/* Main Title - Above model */}
          <div className="relative mb-8 z-[4]" style={{ marginBottom: "15vh" }}>
            <h1 className="text-[clamp(4rem,12vw,10rem)] leading-none font-bold text-center">
              <span className="block bg-gradient-to-r from-red-600 via-orange-400 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,100,100,0.8)] animate-glow">
                GS HIEU
              </span>
              <span className="absolute inset-0 text-transparent">GS HIEU</span>
            </h1>
          </div>

          {/* Author Info - Bottom right corner */}
          <div className="absolute bottom-12 right-12 text-right z-[4] pointer-events-auto">
            <div className="backdrop-blur-md bg-black/70 p-6 rounded-2xl border-4 border-red-600 shadow-[0_8px_32px_rgba(255,100,100,0.5)] hover:shadow-[0_12px_40px_rgba(255,100,100,0.7)] transition-all duration-300 hover:scale-105">
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
                GS HIEU
              </h2>
              <div className="h-[2px] w-16 bg-gradient-to-r from-red-600 via-orange-400 to-red-400 ml-auto mb-3"></div>
              <p className="text-lg font-semibold text-red-400 mb-1 drop-shadow-md">
                PORTFOLIO
              </p>
              <p className="text-sm text-gray-300 italic drop-shadow-md">
                It's Show Time
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

        * {
          font-family: "Poppins", Arial, sans-serif;
        }

        @keyframes autoRotate {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(-360deg);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes falling-dust {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(120vh)
              translateX(${Math.random() * 40 - 20}px);
            opacity: 0;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes ray-1 {
          0%,
          100% {
            opacity: 0.2;
            transform: translateX(-10px);
          }
          50% {
            opacity: 0.4;
            transform: translateX(10px);
          }
        }

        @keyframes ray-2 {
          0%,
          100% {
            opacity: 0.15;
            transform: translateX(10px);
          }
          50% {
            opacity: 0.35;
            transform: translateX(-10px);
          }
        }

        @keyframes ray-3 {
          0%,
          100% {
            opacity: 0.18;
            transform: translateX(5px);
          }
          50% {
            opacity: 0.38;
            transform: translateX(-5px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 40px rgba(255, 100, 100, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(255, 150, 100, 1));
          }
        }

        .animate-autoRotate {
          animation: autoRotate 20s linear infinite;
        }

        .animate-paused {
          animation: autoRotate 20s linear infinite;
          animation-play-state: paused;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-ray-1 {
          animation: ray-1 3s ease-in-out infinite;
        }

        .animate-ray-2 {
          animation: ray-2 4s ease-in-out infinite;
        }

        .animate-ray-3 {
          animation: ray-3 3.5s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        .animate-falling-dust {
          animation: falling-dust linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
