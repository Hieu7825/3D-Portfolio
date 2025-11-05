import { ExternalLink, Play } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ProjectCard = ({ videoSrc, title, description, gradientText, link }) => {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Tự động phát video khi component mount hoặc videoSrc thay đổi
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, [videoSrc]);

  return (
    <div className="project-card relative w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)] overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none"></div>

      {/* Video Side with Hover Effect */}
      <div
        className="relative z-10 flex-1 flex items-center justify-center cursor-pointer group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-full max-w-lg">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            src={videoSrc}
            className="w-full rounded-2xl object-cover shadow-[0_0_30px_rgba(220,38,38,0.4)] border-2 border-red-600/30 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(220,38,38,0.8)] group-hover:border-red-500/70 group-hover:scale-[1.02]"
          ></video>

          {/* Hover Glow Effect */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
              isHovering
                ? "opacity-100 bg-gradient-to-t from-red-600/20 via-transparent to-transparent"
                : "opacity-0"
            }`}
          ></div>
        </div>
      </div>

      {/* Content Side */}
      <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6 lg:pl-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] leading-tight">
          {title}{" "}
          <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
            {gradientText}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed text-gray-300 max-w-xl">
          {description}
        </p>

        {/* Website Button */}
        <a
          href={link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-2 self-start rounded-[15px] border-2 border-red-600 bg-black/80 py-3 px-6 md:px-8 text-sm md:text-base text-white shadow-lg shadow-red-600/50 transition-all duration-300 hover:bg-red-900 hover:shadow-xl hover:shadow-red-600/70 hover:scale-105 group"
        >
          <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />{" "}
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
