import { SendHorizontal, CornerUpLeft } from "lucide-react";
import React, { useState, useRef } from "react";

const AboutMe = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  const runTimeOutRef = useRef(null);

  const cardsData = [
    {
      id: 1,
      title: "Hi there, I'm Hieu",
      description:
        "I'm a web development enthusiast starting my journey in both frontend and backend, aiming to create dynamic and responsive websites.",
      image: "/public/images/Me.png",
      alt: "Coding",
    },
    {
      id: 2,
      title: "Tech Stack",
      description:
        "I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.",
      image: "/public/images/grid2.png",
      alt: "Tech Stack",
    },
    {
      id: 3,
      title: "🌍 Open to the world",
      description:
        "Based in Vietnam, I'm learning web development and open to remote opportunities to grow and contribute.",
      image: null,
      video: "/public/videos/glob.mp4",
      alt: "Globe",
    },
    {
      id: 4,
      title: "My Passion for Coding",
      description:
        "I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills.",
      image: "/public/images/grid4.png",
      alt: "Passion for Coding",
    },
  ];

  const showCard = (type) => {
    let newIndex = activeCard;
    if (type === "next") {
      newIndex = (activeCard + 1) % cardsData.length;
      setTransitionClass("next");
    } else {
      newIndex = (activeCard - 1 + cardsData.length) % cardsData.length;
      setTransitionClass("prev");
    }
    setActiveCard(newIndex);

    if (runTimeOutRef.current) {
      clearTimeout(runTimeOutRef.current);
    }
    runTimeOutRef.current = setTimeout(() => {
      setTransitionClass("");
    }, 500);
  };

  const currentCard = cardsData[activeCard];

  return (
    <section
      className="relative flex w-full h-screen overflow-hidden items-center justify-center bg-gradient-to-br from-black via-red-950 to-black"
      id="About"
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

      {/* Main Card Display */}
      <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        {/* Large Card */}
        <div
          className={`card-container relative w-full max-w-5xl h-[70vh] transition-all duration-500 ${
            transitionClass === "next"
              ? "animate-slide-left"
              : transitionClass === "prev"
              ? "animate-slide-right"
              : ""
          }`}
        >
          <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)] overflow-hidden">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none"></div>

            {/* Content Side */}
            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] leading-tight">
                {currentCard.title.includes("🌍") ? (
                  <>
                    <span>{currentCard.title.split(" ")[0]}</span>
                    {" " + currentCard.title.split(" ").slice(1).join(" ")}
                  </>
                ) : (
                  currentCard.title
                )}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-300 max-w-xl">
                {currentCard.description}
              </p>

              {/* Contact Button (only for card 3) */}
              {currentCard.id === 3 && (
                <button className="flex cursor-pointer items-center gap-2 self-start rounded-[15px] border-2 border-red-600 bg-black/80 py-3 px-6 md:px-8 text-sm md:text-base text-white shadow-lg shadow-red-600/50 transition-all duration-300 hover:bg-red-900 hover:shadow-xl hover:shadow-red-600/70 hover:scale-105">
                  <SendHorizontal className="w-4 h-4" /> Contact Me
                </button>
              )}
            </div>

            {/* Image/Visual Side */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              {currentCard.video ? (
                <video
                  src={currentCard.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-2xl opacity-90 shadow-[0_0_30px_rgba(220,38,38,0.3)] mix-blend-lighten"
                />
              ) : currentCard.image ? (
                <img
                  src={currentCard.image}
                  alt={currentCard.alt}
                  className="max-w-full max-h-[300px] md:max-h-[400px] object-contain rounded-2xl opacity-90 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                />
              ) : (
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-red-600 to-red-400 opacity-60 shadow-[0_0_60px_rgba(220,38,38,0.6)] animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center">
        <button
          onClick={() => showCard("prev")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &lt;
        </button>

        {/* Card Indicators */}
        <div className="flex gap-2">
          {cardsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeCard
                  ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  : "w-2 bg-gray-500 hover:bg-red-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => showCard("next")}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &gt;
        </button>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute top-20 md:top-24 right-4 md:right-8 z-40 flex flex-col gap-3">
        {cardsData.map((card, index) => (
          <button
            key={card.id}
            onClick={() => setActiveCard(index)}
            className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              index === activeCard
                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-110"
                : "border-red-600/30 hover:border-red-500 opacity-60 hover:opacity-100"
            }`}
          >
            {card.image ? (
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover"
              />
            ) : card.video ? (
              <video
                src={card.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover mix-blend-lighten"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-400 flex items-center justify-center text-2xl">
                🌍
              </div>
            )}
            {index === activeCard && (
              <div className="absolute inset-0 bg-red-600/20 backdrop-blur-[1px]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{ width: `${((activeCard + 1) / cardsData.length) * 100}%` }}
        ></div>
      </div>

      {/* Title */}
      <h2 className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-40 text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]">
        Hello, There{" "}
        <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
          👋
        </span>
      </h2>
    </section>
  );
};

export default AboutMe;
