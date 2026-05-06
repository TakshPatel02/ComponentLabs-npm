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
- EncryptButton
- MagnetButton
- NeumorphismButton
- NeuralHoverLinks
- ClipPathLinks
- TakeoverLinks
- StaggeredEntranceHero
- StripeWriter
- TerminalTypingCard
- VintageFader

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
