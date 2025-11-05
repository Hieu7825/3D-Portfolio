import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Gem, SendHorizontal, CornerUpLeft } from "lucide-react";

const HeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative flex w-full h-screen overflow-hidden items-center justify-between bg-gradient-to-br from-black via-red-950 to-black">
      {/* Nút Home ở góc trên trái */}
      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        aria-label="Go to Home"
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center text-white p-2 rounded-md border-2 border-red-500 bg-black/70 shadow-sm shadow-red-600/30 transition-all duration-200 hover:bg-red-900 hover:shadow-md hover:scale-105 cursor-pointer"
      >
        <CornerUpLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Container chính với responsive layout */}
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-12 xl:px-16 py-20 lg:py-0">
        {/* Thông tin bên trái */}
        <div
          className="autoBlur w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div className="hero-info-title flex items-center justify-center gap-x-2 text-red-400 py-2 px-3 md:px-4 rounded-full border-2 border-red-600 w-full max-w-[320px] md:max-w-[340px] bg-black/60 shadow-[0_0_15px_rgba(220,38,38,0.5)] text-sm md:text-base lg:text-lg font-medium backdrop-blur-md">
            <Gem className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            <span>Full-Stack Developer Portfolio</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-full lg:max-w-[700px] font-bold leading-tight lg:leading-[1.2] mt-6 md:mt-8 lg:mt-10 mb-4 md:mb-6 lg:mb-8 text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            Providing{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
              the best
            </span>{" "}
            Project{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>

          <p className="max-w-full lg:max-w-[550px] leading-relaxed mb-6 md:mb-8 lg:mb-10 text-sm md:text-base lg:text-lg font-medium tracking-wide text-gray-300 drop-shadow-md">
            Future Full-Stack Developer, honing skills in front-end and back-end
            technologies through hands-on projects in web, mobile, and software
            development.
          </p>

          {/* Contact Me */}
          <div className="flex gap-x-4">
            <button className="flex items-center justify-center gap-x-2 text-white py-3 px-6 md:py-4 md:px-8 lg:py-[15px] lg:px-[35px] rounded-[10px] border-2 md:border-4 border-red-600 bg-black shadow-lg shadow-red-600/50 cursor-pointer transition-all duration-300 hover:bg-red-900 hover:shadow-xl hover:shadow-red-600/70 hover:scale-105 hover:border-red-400 hover:-translate-y-1 font-medium text-sm md:text-base">
              <SendHorizontal className="w-4 h-4" /> Contact Me
            </button>
          </div>
        </div>

        {/* Video bên phải - Ẩn trên mobile, hiển thị từ lg trở lên */}
        <div className="hidden lg:flex skills-video-box w-1/2 items-center justify-center">
          <video
            className="skills-video autoBlur max-h-[500px] xl:max-h-[660px] w-auto mix-blend-lighten drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            autoPlay
            loop
            muted
            playsInline
            src="/public/videos/hero-video.mp4"
          ></video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
