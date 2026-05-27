import React from "react";
import { SiVercel, SiSpotify, SiCisco } from "react-icons/si";
import { FaBolt } from "react-icons/fa";

const defaultCompanies = [
  { name: "", icon: <FaBolt />, showText: false },
  { name: "CISCO", icon: <SiCisco className="w-12 h-12" />, showText: false },
  { name: "hulu", icon: null, showText: true },
  { name: "Spotify", icon: <SiSpotify />, showText: true },
  { name: "Vercel", icon: <SiVercel />, showText: true },
];

export const CenteredLogoCloud = ({
  headline = "You're in good company",
  description = "ComponentLabs is trusted by leading teams from Generative AI Companies, Hosting Providers, Payments Providers, Streaming Providers",
  companies = defaultCompanies,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-surface-container py-16 px-4 md:px-12 lg:px-20 flex flex-col items-center justify-center font-sans overflow-hidden rounded-xl border oklab-border ${className}`}
    >
      <div className="text-center max-w-2xl mb-12">
        {headline && (
          <h2 className="text-2xl md:text-3xl font-section-heading text-primary mb-4">
            {headline}
          </h2>
        )}
        {description && (
          <p className="font-editorial-standard text-on-surface-variant text-sm md:text-base leading-relaxed italic">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-16 w-full max-w-4xl mx-auto">
        {companies.map((company, idx) => (
          <CompanyLogo key={idx} {...company} />
        ))}
      </div>
    </div>
  );
};

const CompanyLogo = ({ name, icon, showText }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-on-surface hover:text-primary transition-all duration-300 min-w-max h-12 cursor-pointer grayscale hover:grayscale-0 opacity-80 hover:opacity-100">
      {icon && (
        <span className="text-2xl md:text-3xl flex items-center">{icon}</span>
      )}
      {(showText || (!icon && name)) && (
        <span className="text-xl md:text-2xl font-bold tracking-tighter">
          {name}
        </span>
      )}
    </div>
  );
};
