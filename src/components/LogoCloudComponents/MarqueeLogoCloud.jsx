import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  SiVercel,
  SiSupabase,
  SiSpotify,
  SiFirebase,
  SiFigma,
  SiCisco,
} from "react-icons/si";
import { FaBolt, FaBroadcastTower } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const defaultCompanies = [
  { name: "bolt", icon: <FaBolt /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "supabase", icon: <SiSupabase /> },
  { name: "Spotify", icon: <SiSpotify /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Beacon", icon: <FaBroadcastTower /> },
  { name: "Claude", icon: <BsStars /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "CISCO", icon: <SiCisco /> },
];

export const MarqueeLogoCloud = ({
  headline = "Your favorite companies are our partners.",
  companies = defaultCompanies,
  className = "",
  speed = 40,
}) => {
  // Helper to ensure the marquee contains enough items to span screen width without gaps,
  // and duplicate it to create a perfectly seamless infinite loop when moving 0% -> -50%.
  const repeatedCompanies = useMemo(() => {
    if (!companies || companies.length === 0) return [];
    
    // We want at least 15 items in our base array to guarantee coverage on extremely wide screens
    let baseArray = [...companies];
    while (baseArray.length < 15) {
      baseArray = [...baseArray, ...companies];
    }
    
    // For a seamless infinite marquee, we duplicate this base array once
    // and animate the container translateX from 0% to -50%
    return [...baseArray, ...baseArray];
  }, [companies]);

  return (
    <div
      className={`w-full bg-surface-container py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans overflow-hidden rounded-xl border oklab-border relative ${className}`}
    >
      {headline && (
        <h2 className="text-center font-section-heading text-primary text-xl sm:text-2xl mb-12 z-10">
          {headline}
        </h2>
      )}

      <div
        className="flex overflow-hidden w-full max-w-6xl mx-auto"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex items-center gap-12 sm:gap-20 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          }}
        >
          {repeatedCompanies.map((company, idx) => (
            <CompanyLogo key={idx} name={company.name} icon={company.icon} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const CompanyLogo = ({ name, icon }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-on-surface transition-all duration-300 min-w-max h-12 grayscale hover:grayscale-0 cursor-pointer px-4">
      {icon && <span className="text-xl md:text-2xl">{icon}</span>}
      <span className="font-editorial-standard text-xl md:text-2xl font-bold tracking-tight">
        {name}
      </span>
    </div>
  );
};

export default MarqueeLogoCloud;