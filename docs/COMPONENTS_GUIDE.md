# Component Usage Guide

This guide covers basic and advanced usage for the most-used components in this repository. Each section includes:

- quick import
- default usage example
- props (names, types, defaults)
- short notes and integration tips

Notes:

- These components rely on `React` and Motion/Tailwind utilities used in the repo (`motion/react`, `framer-motion`, Tailwind CSS). Make sure those are installed and configured in your host app.

---

## Table of contents

- AnimatedFAQ
- CreativeHighlightText
- EncryptedText
- EncryptButton
- MagnetButton
- NeumorphismButton
- NeuralHoverLinks
- ClipPathLinks
- TakeoverLinks
- StaggeredEntranceHero
- StripeWriter
- VelocityText
- TerminalTypingCard
- VintageFader
- FluidCursorTrail
- MarqueeLogoCloud
- AuroraHero
- CinematicCards

---

## AnimatedFAQ

- File: src/components/OtherComponents/AnimatedFAQ.jsx

Import

```jsx
import { AnimatedFAQ } from "../src/components/OtherComponents/AnimatedFAQ";
```

Default usage

```jsx
<AnimatedFAQ />
```

Props

- `faqs` (Array) — list of { question, answer }. Default: built-in `DEFAULT_FAQS`.
- `question` (string) — if provided with `answer` the component will render a single FAQ.
- `answer` (string)

Examples

Single custom FAQ:

```jsx
<AnimatedFAQ
  question="How to use this?"
  answer="Just import and pass faqs or a single question/answer."
/>
```

Custom list:

```jsx
const myFaqs = [
  { question: "Q1", answer: "A1" },
  { question: "Q2", answer: "A2" },
];
<AnimatedFAQ faqs={myFaqs} />;
```

Notes

- Uses `motion` and `AnimatePresence`. Keep `faqs` small for UX clarity.

---

## CreativeHighlightText

- File: src/components/TextComponents/CreativeHighlightText.jsx

Import

```jsx
import { CreativeHighlightText } from "../src/components/TextComponents/CreativeHighlightText";
```

Default usage

```jsx
<CreativeHighlightText
  text="Main heading"
  decorText="accent"
  para="Supporting paragraph here."
/>
```

Props

- `text` (string) — main headline.
- `decorText` (string) — highlighted/decoration word.
- `para` (string) — supporting paragraph.

Notes

- This component includes inline SVG accents and animated sparkles. You can safely change `text` and `decorText` strings; styles follow Tailwind classes in the component.

---

## EncryptedText

- File: src/components/TextComponents/EncryptedText.jsx

Import

```jsx
import { EncryptedText } from "../src/components/TextComponents/EncryptedText";
```

Default usage

```jsx
<EncryptedText text="Access granted" />
```

Props

- `text` (string) — text to scramble and reveal. Required.
- `interval` (number) — update interval in ms for each scramble tick. Default: `50`.
- `duration` (number) — total reveal duration in ms. Default: `3000`.
- `className` (string) — optional classes appended to the text wrapper.

Examples

```jsx
<EncryptedText
  text="Initializing secure channel..."
  interval={35}
  duration={2000}
  className="text-sm md:text-base text-emerald-400"
/>
```

Notes

- Uses randomized glyphs from an internal character set and progressively reveals the original text.
- Spaces in the source text are preserved during animation.
- Very long strings with very small `interval` values may increase render updates.

---

## EncryptButton

- File: src/components/ButtonComponents/EncryptButton.jsx

Import

```jsx
import { EncryptButton } from "../src/components/ButtonComponents/EncryptButton";
```

Default usage

```jsx
<EncryptButton />
```

Props

- `targetText` (string) — default: `"Encrypt data"` — text shown on the button and used for scramble animation.
- `className` (string) — appended to the button's class list.

Examples

```jsx
<EncryptButton targetText="Secure Now" className="my-4" />
```

Notes

- Hovering the button triggers a scramble/decrypt animation. The component uses `useRef` and `setInterval` — it purposely does not instantly stop scrambling on mouse leave for a natural reveal.

---

## MagnetButton

- File: src/components/ButtonComponents/MagnetButton.jsx

Import

```jsx
import { MagnetButton } from "../src/components/ButtonComponents/MagnetButton";
```

Default usage

```jsx
<MagnetButton />
```

Props

- `text` (string) — default: `"Hover Me"` — label shown inside the button.
- `onClick` (function) — optional click handler.

Examples

```jsx
<MagnetButton text="Try this" onClick={() => alert("clicked")} />
```

Notes

- Creates a magnetic cursor-follow effect by tracking mouse position inside a wrapper. Keep the component inside a reasonably sized container for best effect.

---

## NeumorphismButton

- File: src/components/ButtonComponents/NeumorphismButton.jsx

Import

```jsx
import { NeumorphismButton } from "../src/components/ButtonComponents/NeumorphismButton";
```

Default usage

```jsx
<NeumorphismButton />
```

Props

- `text` (string) — default: `"Initialize AI"` — label shown inside the button.

Examples

```jsx
<NeumorphismButton text="Start" />
```

Notes

- Designed to rely on a light surface background (neumorphic look). If you place it on a different background, adjust the `bg-` Tailwind classes inside the component or wrap it in a container with matching background.

---

## NeuralHoverLinks

- File: src/components/Linkcomponent/NeuralHoverLinks.jsx

Import

```jsx
import NeuralHoverLinks from "../src/components/Linkcomponent/NeuralHoverLinks";
```

Default usage

```jsx
<NeuralHoverLinks />
```

Props

- This component currently uses an internal `LINKS_DATA` array. There is no external prop API in the file.

How to customize

- To provide your own links, modify the `LINKS_DATA` array in the component or refactor the component to accept `links` prop of shape `[{ heading, subheading, imgSrc, href }, ...]`.

Example refactor usage (suggested):

```jsx
// Suggested change: accept `links` prop and map instead of internal LINKS_DATA
// Then use:
const links = [
  { heading: "About", subheading: "...", imgSrc: "...", href: "#" },
];
<NeuralHoverLinks links={links} />;
```

Notes

- The links rows react to mouse position to create parallax and scramble effects. Each item expects `imgSrc` to be a valid image URL.

---

## ClipPathLinks

- File: src/components/Linkcomponent/ClipPathLinks.jsx

Import

```jsx
import { ClipPathLinks } from "../src/components/Linkcomponent/ClipPathLinks";
```

Default usage

```jsx
<ClipPathLinks />
```

Props

- `groups` (Array) — array of rows, where each row is an array of link items shaped like `{ Icon, href, label }`. Default: the built-in icon groups shown in the component.
- `className` (string) — optional classes appended to the outer wrapper.

Examples

```jsx
import { Globe, Mail, Github } from "lucide-react";

const groups = [
  [
    { Icon: Globe, href: "https://example.com", label: "Website" },
    { Icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  ],
  [{ Icon: Github, href: "https://github.com/example", label: "GitHub" }],
];

<ClipPathLinks groups={groups} />;
```

```jsx
<ClipPathLinks className="max-w-3xl mx-auto" />
```

Notes

- The component keeps the clip-path hover animation for every link box.
- Grid columns are derived from each row in `groups`, so you can mix 2-item, 3-item, or 4-item rows without changing the component code.
- Every item should provide a stable `label` for accessibility and a valid `Icon` component from `lucide-react` or a compatible SVG component.

---

## TakeoverLinks

- File: src/components/Linkcomponent/TakeoverLinks.jsx

Import

```jsx
import TakeoverLinks from "../src/components/Linkcomponent/TakeoverLinks";
```

Default usage

```jsx
<TakeoverLinks />
```

Props

- `links` (Array) — array of link objects shaped like `{ label, href, color }`. Default: the built-in ART / DESIGN / PHOTOS / CONTACT set.
- `className` (string) — optional classes appended to the outer section.

Examples

```jsx
const links = [
  { label: "WORK", href: "/work", color: "#2f4858" },
  { label: "ABOUT", href: "/about", color: "#8f5e3b" },
  { label: "CONTACT", href: "/contact", color: "#5f6f52" },
];

<TakeoverLinks links={links} />;
```

```jsx
<TakeoverLinks className="max-w-5xl mx-auto" />
```

Notes

- The first link color becomes the initial background color until a hover interaction changes it.
- Hovering a row triggers the split-text animation and reveals the full-section color takeover background.
- Keep labels short and uppercase for the strongest visual effect.

---

## StaggeredEntranceHero

- File: src/components/HeroComponents/StaggeredEntranceHero.jsx

Import

```jsx
import { StaggeredEntranceHero } from "../src/components/HeroComponents/StaggeredEntranceHero";
```

Default usage

```jsx
<StaggeredEntranceHero />
```

Props

- No public props in current implementation; the component uses hard-coded copy and buttons.

How to customize

- Replace heading, subtext, and action buttons in the JSX or change to accept `title`, `subtitle`, and `actions` props.

Notes

- Uses `framer-motion` in this file; ensure `framer-motion` is installed if you reuse this component independently.

---

## StripeWriter

- File: src/components/TextComponents/StripeWriter.jsx

Import

```jsx
import { StripeWriter } from "../src/components/TextComponents/StripeWriter";
```

Default usage

```jsx
<StripeWriter />
```

Props

- `text` (string) — default: a sample sentence.
- `delay` (number) — initial delay before animation (seconds). Default: `0`.
- `speed` (number) — stagger speed (smaller = faster). Default: `0.03`.
- `className` (string) — wrapper classes.
- `cursorClassName` (string) — classes for the animated cursor block.
- `triggerOnce` (boolean) — whether to animate only once when in view. Default: `true`.

Examples

```jsx
<StripeWriter text="Hello world" speed={0.02} delay={0.2} />
```

Notes

- The component animates characters individually with Motion variants.

---

## VelocityText

- File: src/components/TextComponents/VelocityText.jsx

Import

```jsx
import { VelocityText } from "../src/components/TextComponents/VelocityText";
```

Default usage

```jsx
<VelocityText text="Scroll to distort and slide this message" />
```

Props

- `text` (string) — content rendered in the horizontal animated line. Default: built-in persistence quote.
- `heightClass` (string) — Tailwind height utility applied to viewport and sticky area. Default: `"h-[400px]"`.

Examples

```jsx
<VelocityText
  text="Design systems become unforgettable when motion has intent."
  heightClass="h-[320px]"
/>
```

```jsx
<div className="max-w-screen overflow-hidden">
  <VelocityText heightClass="h-[500px]" />
</div>
```

Notes

- Scroll progress drives horizontal translation while scroll velocity drives skew, creating a kinetic marquee effect.
- The component uses an internal scroll container (`overflow-y-auto`) with a large virtual height (`h-[800vh]`) to produce enough scroll distance.
- Best used in full-width sections with clipped overflow so long text stays visually clean.

---

## TerminalTypingCard

- File: src/components/OtherComponents/TerminalTypingCard.jsx

Import

```jsx
import { TerminalTypingCard } from "../src/components/OtherComponents/TerminalTypingCard";
```

Default usage

```jsx
<TerminalTypingCard />
```

Props

- `lines` (Array) — array of line objects with:
  - `text` (string) — the text to display
  - `delay` (number) — delay in milliseconds before showing this line (default: 400)
  - `type` (string) — line type: `"cmd"`, `"output"`, `"success"`, or `"info"` (determines styling and animation)
  - Default: sample npm install terminal transcript

Line type styling:

- `"cmd"` — command lines, typed out character-by-character with typewriter effect and `❯` prefix
- `"output"` — neutral gray output text, displays instantly
- `"success"` — green success messages
- `"info"` — blue informational messages

Examples

```jsx
// Simple custom commands
const lines = [
  { text: "npm run build", delay: 800, type: "cmd" },
  { text: "Compiling...", delay: 1200, type: "output" },
  { text: "✔ Build complete", delay: 600, type: "success" },
];
<TerminalTypingCard lines={lines} />;
```

```jsx
// Show TypeScript compilation flow
const lines = [
  { text: "tsc --noEmit", delay: 600, type: "cmd" },
  { text: "Type checking enabled", delay: 400, type: "info" },
  { text: "Found 0 errors", delay: 400, type: "success" },
];
<TerminalTypingCard lines={lines} />;
```

Notes

- The typewriter effect for `type: 'cmd'` lines simulates realistic typing with random speed variation (30–70ms per character).
- Non-command lines render instantly after their specified `delay`, allowing you to create realistic terminal output sequences.
- Uses `motion` for the animated cursor (blinking caret).
- Styled with dark terminal background (#0d0d0d) and a macOS-style traffic light header.
- Max width is set to 2xl; use container queries or wrapper divs to adjust size in your layout.
- Ideal for showcasing CLI workflows, installation steps, or deployment pipelines.

---

## VintageFader

- File: src/components/OtherComponents/EditorialSlider.jsx

Import

```jsx
import { VintageFader } from "../src/components/OtherComponents/EditorialSlider";
```

Default usage

```jsx
<VintageFader />
```

Props

- `min` (number) — minimum slider value. Default: `0`
- `max` (number) — maximum slider value. Default: `100`
- `defaultValue` (number) — initial slider position. Default: `50`
- `step` (number) — step increment for value changes. Default: `1`
- `onChange` (function) — callback fired on value change: `(newValue) => {}`

Examples

```jsx
// Basic gain fader
<VintageFader onChange={(value) => console.log(value)} />
```

```jsx
// Custom range with step
<VintageFader
  min={-20}
  max={20}
  defaultValue={0}
  step={0.5}
  onChange={(db) => setGain(db)}
/>
```

```jsx
// Volume control
<VintageFader
  min={0}
  max={100}
  defaultValue={75}
  step={1}
  onChange={(vol) => updateVolume(vol)}
/>
```

Notes

- Styled as a vintage audio mixer fader with brown/tan colors and a chunky analog knob.
- Features tick marks (0–100 scale) and a retro VU-style readout displaying the current value with orange glow.
- Uses pointer events for smooth dragging across desktop and touch devices.
- The fader knob animates slightly when grabbed to give tactile feedback.
- Includes a subtle track fill gradient that responds to the slider position.
- Labels include "CH 1. Master" and "Gain Fader" styling; easily customizable via component props if needed.
- Ideal for audio control interfaces, mixer simulations, or retro-themed dashboards.
- Value is padded to 3 digits in the readout for authentic analog feel (e.g., 005, 050, 100).
---

## FluidCursorTrail

- File: src/components/CreativeComponents/FluidCursorTrail.jsx

Import

```jsx
import { FluidCursorTrail } from "../src/components/CreativeComponents/FluidCursorTrail";
```

Default usage (Global fullscreen mode)

```jsx
<FluidCursorTrail isGlobal={true} />
```

Local container mode usage

```jsx
<div className="relative w-full h-[500px]">
  <FluidCursorTrail isGlobal={false} />
</div>
```

Props

- `isGlobal` (boolean) — If `true`, the canvas trail is fixed fullscreen (`fixed inset-0 pointer-events-none z-[9999]`), functioning as a global navigation backdrop. If `false`, it stays locally in its parent container as a card widget. Default: `true`.
- `color` (string) — Trail color (hex, rgb, rgba). Default: `"rgba(232, 86, 122, 0.85)"`.
- `pointsNumber` (number) — Quantity of points in the fluid physics chain (trail length). Default: `40`.
- `widthFactor` (number) — Thickness multiplier for the trail. Default: `0.3`.
- `spring` (number) — Spring stiffness of the trail (larger = faster trail reaction). Default: `0.4`.
- `friction` (number) — Movement damping of the trail (larger = more friction / slower slide). Default: `0.5`.
- `className` (string) — Custom classes for styling extensions.

Notes

- When `isGlobal={true}` is active, the overlay uses `pointer-events: none`, meaning visitors can click links, buttons, and fully interact with and navigate the page normally.
- If the mouse is stationary or hasn't moved yet, the trail floats automatically in a elegant, looping sine/cosine path, keeping the page feeling alive.

---

## MarqueeLogoCloud

- File: src/components/LogoCloudComponents/MarqueeLogoCloud.jsx

Import

```jsx
import { MarqueeLogoCloud } from "../src/components/LogoCloudComponents/MarqueeLogoCloud";
```

Default usage

```jsx
<MarqueeLogoCloud />
```

Props

- `headline` (string) — Optional heading text above the marquee. Set to `null` or `""` to hide it. Default: `"Your favorite companies are our partners."`
- `companies` (Array) — List of company logo objects formatted as `{ name, icon }`. Default: built-in list of 9 popular platforms (Vercel, Supabase, Spotify, etc.).
- `speed` (number) — Animation cycle duration in seconds (smaller = faster scroll speed). Default: `40`.
- `className` (string) — Custom classes for styling extensions.

Examples

Custom companies list:

```jsx
import { SiGithub, SiGithubactions, SiSlack } from "react-icons/si";

const myPartners = [
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Actions", icon: <SiGithubactions /> },
  { name: "Slack", icon: <SiSlack /> },
];

<MarqueeLogoCloud headline="Our Ecosystem" companies={myPartners} speed={25} />
```

Notes

- Uses a dynamic `-50%` relative translation loop, ensuring perfect loop seamlessness on any screen size regardless of custom logo widths or names.
- Includes a built-in `repeatCompaniesToFit` helper that replicates the company logos array until it has at least 15 items, ensuring a perfect full-bleed layout without gaps even on ultra-wide screens.

---

## AuroraHero

- File: src/components/HeroComponents/AuroraHero.jsx

Import

```jsx
import { AuroraHero } from "../src/components/HeroComponents/AuroraHero";
```

Default usage

```jsx
<AuroraHero />
```

Props

- `badgeText` (string) — Supporting status tag above heading. Set to `null` or `""` to hide it. Default: `"Beta Now Live!"`.
- `title` (string) — Main title text. Default: `"Decrease your SaaS churn by over 90%"`.
- `description` (string) — Paragraph copy. Default: built-in retention description.
- `ctaText` (string) — Call to action button label. Default: `"Start free trial"`.
- `onCtaClick` (function) — Click event callback handler for CTA button.
- `starCount` (number) — Density of canvas starfield. Default: `250`.
- `colors` (Array) — Custom color strings for the animated aurora gradient background. Default: sequence of signature mint, blue, lavender, and pink gradient.
- `className` (string) — Custom classes for styling extensions.

Examples

```jsx
<AuroraHero
  badgeText="New Update"
  title="Create beautifully interactive React dashboards in seconds"
  description="Bring your interfaces to life with fully customizable components built with Tailwind CSS and Framer Motion."
  ctaText="Explore Docs"
  starCount={150}
  colors={["#FF0055", "#00FF55", "#0055FF"]}
  onCtaClick={() => console.log("cta clicked!")}
/>
```

Notes

- Implements a canvas-based twinkling starfield background combined with an animated radial gradient using Framer Motion.
- Sizing bounds-checks are built-in defensively to ensure canvas rendering is always clean.

---

## CinematicCards

- File: src/components/CreativeComponents/CinematicCards.jsx

Import

```jsx
import { CinematicCards } from "../src/components/CreativeComponents/CinematicCards";
```

Default usage

```jsx
<CinematicCards />
```

Props

- `items` (Array) — Custom array of card items containing `{ id, title, subtitle, copy, button, image }`. Default: built-in Mountains, Beach, Desert, and Space cards.
- `hoverToActivate` (boolean) — If `true`, hovering over collapsed cards expands them. If `false`, click interaction is required. Default: `true`.
- `onCardChange` (function) — Callback triggered when active card changes: `(index, card) => void`.
- `className` (string) — Custom classes for outer container.
- `containerClassName` (string) — Custom classes for inner flex container.

Examples

Custom slides:

```jsx
const customSlides = [
  {
    id: 1,
    title: "Cyber City",
    subtitle: "NEON DREAMS",
    copy: "Explore future streetscapes and high-tech corporate heights.",
    button: "Enter City",
    image: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=800"
  },
  {
    id: 2,
    title: "Deep Sea",
    subtitle: "ABYSS VOYAGE",
    copy: "Submerge into pitch-black waters and glowing marine biology.",
    button: "Submerge",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
  }
];

<CinematicCards items={customSlides} hoverToActivate={false} onCardChange={(idx, item) => console.log(item)} />
```

Notes

- Leverages Framer Motion's layout animations (`layout` and `layout="position"`) for smooth accordion-like slide expansions.
- Incorporates selective grayscale and brightness transitions, custom number side accents, and consistent visual details using the signature accent color `#cf2d56`.

---

## Integration tips

- Install dependencies used across components (example):

```bash
npm install react motion framer-motion lucide-react
```

- These components assume Tailwind CSS for styling. If your site uses a different system, either keep Tailwind available or port the classes to your CSS system.

- For server-side rendering, ensure motion animations are guarded or only run on client-side mount when necessary.

---

## File locations

- See the component sources inside the repository under `src/components/*`.

If you want, I can:

- add `links` prop support to `NeuralHoverLinks` and update the component,
- scaffold a `VintageFader` component,
- or open a PR with the docs added to the README.
