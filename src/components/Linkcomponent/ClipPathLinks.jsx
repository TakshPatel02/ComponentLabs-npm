import React from "react";
import {
  Apple,
  Cloud,
  Code2,
  Globe,
  Link2,
  Music,
  Play,
  ShoppingBag,
  Siren,
} from "lucide-react";
import { useAnimate } from "motion/react";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, label = "Brand link" }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (event) => {
    const box = event.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - event.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - event.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - event.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - event.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (event) => {
    const side = getNearestSide(event);
    animate(
      scope.current,
      { clipPath: ENTRANCE_KEYFRAMES[side] },
      { duration: 0.25 },
    );
  };

  const handleMouseLeave = (event) => {
    const side = getNearestSide(event);
    animate(
      scope.current,
      { clipPath: EXIT_KEYFRAMES[side] },
      { duration: 0.25 },
    );
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-24 md:h-28"
      aria-label={label}
    >
      <Icon className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-[#11100a]" />

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-[#11100a] text-[#f2f1ed]"
      >
        <Icon className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
      </div>
    </a>
  );
};

const DEFAULT_LINK_GROUPS = [
  [
    { Icon: Globe, href: "#", label: "Globe" },
    { Icon: ShoppingBag, href: "#", label: "Shopping bag" },
  ],
  [
    { Icon: Apple, href: "#", label: "Apple" },
    { Icon: Siren, href: "#", label: "Siren" },
    { Icon: Play, href: "#", label: "Play" },
    { Icon: Cloud, href: "#", label: "Cloud" },
  ],
  [
    { Icon: Code2, href: "#", label: "Code" },
    { Icon: Music, href: "#", label: "Music" },
    { Icon: Link2, href: "#", label: "Link" },
  ],
];

export const ClipPathLinks = ({
  groups = DEFAULT_LINK_GROUPS,
  className = "",
}) => {
  return (
    <div
      className={`divide-y divide-[#11100a] border border-[#11100a] rounded-xl overflow-hidden ${className}`.trim()}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="grid divide-x divide-[#11100a]"
          style={{
            gridTemplateColumns: `repeat(${group.length}, minmax(0, 1fr))`,
          }}
        >
          {group.map(({ Icon, href, label }) => (
            <LinkBox
              key={label || href}
              Icon={Icon}
              href={href}
              label={label}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
