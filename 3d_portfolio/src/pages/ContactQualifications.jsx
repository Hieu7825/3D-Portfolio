import {
  Code,
  Mail,
  Phone,
  Play,
  Users,
  CornerUpLeft,
  Award,
} from "lucide-react";
import React, { useState } from "react";

const ContactQualifications = () => {
  const [activeView, setActiveView] = useState("contact");

  const certificates = [
    {
      id: 1,
      title: "HTML & CSS",
      description:
        "F8 – 'HTML & CSS Basics' Course Completion Certificate (2025 / 03 / 15)",
      image: "/public/images/htmlcss.png",
      color: "blue",
    },
    {
      id: 2,
      title: "JAVASCRIPT BASIC",
      description:
        "F8 – 'JavaScript Basics' Course Completion Certificate (2025 / 04 / 13)",
      image: "/public/images/javascript.png",
      color: "purple",
    },
    {
      id: 3,
      title: "JAVASCRIPT ADVANCED",
      description:
        "F8 – 'JavaScript Advanced' Course Completion Certificate (2025 / 08 / 23)",
      image: "/public/images/javascriptplus.png",
      color: "pink",
    },
  ];

  const socialLinks = [
    {
      icon: Play,
      url: "https://www.youtube.com/",
      color: "red",
      label: "YouTube",
    },
    {
      icon: Code,
      url: "https://github.com/Hieu7825",
      color: "purple",
      label: "GitHub",
    },
    {
      icon: Users,
      url: "https://www.facebook.com/HFe2oo5",
      color: "blue",
      label: "Facebook",
    },
  ];

  return (
    <section
      className="relative flex w-full h-screen overflow-hidden items-center justify-center bg-gradient-to-br from-black via-red-950 to-black"
      id="contact-qualifications"
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
        {activeView === "contact" ? (
          <>
            Get in Touch{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
              📧
            </span>
          </>
        ) : (
          <>
            My Qualifications{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-clip-text text-transparent">
              🏆
            </span>
          </>
        )}
      </h2>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 shadow-lg transition-all duration-300"
          style={{ width: activeView === "contact" ? "50%" : "100%" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-24">
        {/* Contact View */}
        {activeView === "contact" && (
          <div className="animate-fade-in w-full max-w-5xl h-[70vh] flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-16 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

            {/* Left Side - Contact Info */}
            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] leading-tight">
                Let's Connect
              </h1>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href="tel:0988845322"
                  className="group flex items-center gap-4 text-lg text-gray-300 transition-all duration-300 hover:translate-x-2"
                >
                  <div className="relative flex-shrink-0">
                    <Phone className="w-8 h-8 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-400" />
                    <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    098 884 5322
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:nguyenminhhieu782k5@gmail.com"
                  className="group flex items-center gap-4 text-lg text-gray-300 transition-all duration-300 hover:translate-x-2"
                >
                  <div className="relative flex-shrink-0">
                    <Mail className="w-8 h-8 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:text-red-400" />
                    <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="group-hover:text-white transition-colors break-all">
                    nguyenminhhieu782k5@gmail.com
                  </span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 pt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center justify-center w-14 h-14 border-2 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-[360deg] ${
                      social.color === "red"
                        ? "border-red-400 hover:bg-red-400 hover:shadow-lg hover:shadow-red-400/50"
                        : social.color === "purple"
                        ? "border-purple-400 hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-400/50"
                        : "border-blue-400 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50"
                    }`}
                  >
                    <social.icon className="w-6 h-6 text-white relative z-10 group-hover:text-black transition-colors" />
                    <span
                      className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 ${
                        social.color === "red"
                          ? "bg-red-500/20"
                          : social.color === "purple"
                          ? "bg-purple-500/20"
                          : "bg-blue-500/20"
                      }`}
                    ></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-red-600 to-red-400 opacity-20 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <Mail className="w-48 h-48 md:w-64 md:h-64 text-red-500/40 relative" />
              </div>
            </div>
          </div>
        )}

        {/* Qualifications View */}
        {activeView === "qualifications" && (
          <div className="animate-fade-in w-full max-w-6xl h-[70vh] flex flex-col items-center justify-center gap-8 p-8 md:p-12 rounded-[30px] border-2 border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-red-950/20 pointer-events-none rounded-[30px]"></div>

            {/* Certificates Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative aspect-[3/4] rounded-[20px] border-2 border-red-600/30 overflow-hidden transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105"
                >
                  {/* Certificate Image */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-300 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {cert.description}
                    </p>
                  </div>

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 ${
                      cert.color === "blue"
                        ? "bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"
                        : cert.color === "purple"
                        ? "bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"
                        : "bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0"
                    }`}
                  ></div>
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
              activeView === "contact" ? "qualifications" : "contact"
            )
          }
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &lt;
        </button>

        {/* View Indicators */}
        <div className="flex gap-2">
          {["contact", "qualifications"].map((view) => (
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
              activeView === "contact" ? "qualifications" : "contact"
            )
          }
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/80 hover:bg-red-600 border-2 border-red-500/50 hover:border-red-400 text-white text-xl md:text-2xl font-bold transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-red-500/50 hover:scale-110 backdrop-blur-sm"
        >
          &gt;
        </button>
      </div>

      {/* Thumbnail Preview */}
      <div className="absolute top-20 md:top-24 right-4 md:right-8 z-40 flex flex-col gap-3">
        {["contact", "qualifications"].map((view, index) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`group relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
              view === activeView
                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-110 bg-black/60"
                : "border-red-600/30 hover:border-red-500 opacity-60 hover:opacity-100 bg-black/40"
            }`}
          >
            {view === "contact" ? (
              <Mail className="w-8 h-8 text-red-500" />
            ) : (
              <Award className="w-8 h-8 text-red-500" />
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

export default ContactQualifications;
