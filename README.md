# component-labs

**Premium AI-native UI primitives.** A collection of high-quality, beautifully animated, and ready-to-use React components built with Tailwind CSS and Framer Motion.

## Installation

```bash
npm install component-labs
```

## Setup

Add this to your Tailwind configuration so it picks up the component styles:

### Tailwind v3 (`tailwind.config.js`)

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/component-labs/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Tailwind v4 (`index.css`)

```css
@import "tailwindcss";
@source "../node_modules/component-labs/dist";
```

## Usage

Import the components directly from the package:

```javascript
import { CreativeHighlightText } from "component-labs";

export default function App() {
  return (
    <div className="p-10">
      <CreativeHighlightText />
    </div>
  );
}
```

## Available Components

Our library includes a wide variety of drop-in components across different categories:

### Buttons

- `EncryptButton`
- `FillButton`
- `MagnetButton`
- `NeumorphismButton`

### Text

- `CreativeHighlightText`

## License

MIT