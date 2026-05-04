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

const LinkBox = ({ Icon, href }) => {
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
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[side] }, { duration: 0.25 });
  };

  const handleMouseLeave = (event) => {
    const side = getNearestSide(event);
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[side] }, { duration: 0.25 });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-24 md:h-28"
      aria-label="Brand link"
    >
      <Icon className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-primary text-cursor-cream"
      >
        <Icon className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
      </div>
    </a>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-primary border border-primary rounded-xl overflow-hidden">
      <div className="grid grid-cols-2 divide-x divide-primary">
        <LinkBox Icon={Globe} href="#" />
        <LinkBox Icon={ShoppingBag} href="#" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-primary">
        <LinkBox Icon={Apple} href="#" />
        <LinkBox Icon={Siren} href="#" />
        <LinkBox Icon={Play} href="#" />
        <LinkBox Icon={Cloud} href="#" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-primary">
        <LinkBox Icon={Code2} href="#" />
        <LinkBox Icon={Music} href="#" />
        <LinkBox Icon={Link2} href="#" />
      </div>
    </div>
  );
};

export default ClipPathLinks;
