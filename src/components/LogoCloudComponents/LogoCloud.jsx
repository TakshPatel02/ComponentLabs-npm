import React from "react";
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
  { name: "hulu", icon: null },
  { name: "Spotify", icon: <SiSpotify /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Beacon", icon: <FaBroadcastTower /> },
  { name: "Claude", icon: <BsStars /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "CISCO", icon: <SiCisco /> },
];

export const LogoCloud = ({
  headline = "Your favorite companies are our partners.",
  companies = defaultCompanies,
  className = "",
}) => {
  // First row up to 6, second row handles the rest.
  const firstRow = companies.slice(0, 6);
  const secondRow = companies.slice(6, 10);

  return (
    <div
      className={`w-full bg-surface-container py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans overflow-hidden rounded-xl border oklab-border ${className}`}
    >
      {headline && (
        <h2 className="text-center text-primary font-section-heading text-xl sm:text-2xl mb-12">
          {headline}
        </h2>
      )}

      <div className="max-w-container-max mx-auto flex flex-col items-center gap-10 w-full">
        {/* Row 1 */}
        {firstRow.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-x-20 lg:gap-y-12 w-full">
            {firstRow.map((company, idx) => (
              <CompanyLogo key={idx} name={company.name} icon={company.icon} />
            ))}
          </div>
        )}

        {/* Row 2 */}
        {secondRow.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-x-20 lg:gap-y-12 w-full">
            {secondRow.map((company, idx) => (
              <CompanyLogo key={idx} name={company.name} icon={company.icon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyLogo = ({ name, icon }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-on-surface transition-all duration-300 min-w-max h-12 grayscale hover:grayscale-0 cursor-pointer">
      {icon && <span className="text-xl md:text-2xl">{icon}</span>}
      <span className="text-xl md:text-2xl font-bold tracking-tight">
        {name}
      </span>
    </div>
  );
};