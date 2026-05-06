# 🚀 Component Labs

> **Premium AI-native UI primitives.** A collection of high-quality, beautifully animated, and ready-to-use React components built with Tailwind CSS and Framer Motion.

[![npm version](https://img.shields.io/npm/v/component-labs.svg?style=flat-square)](https://www.npmjs.com/package/component-labs)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

## ✨ Features

- **🎨 Beautifully Designed** - Modern, polished UI components with premium animations
- **⚡ Production Ready** - Fully tested and optimized for performance
- **🎭 Highly Animated** - Smooth, delightful animations powered by Framer Motion
- **🎯 Easy to Use** - Simple imports and straightforward API
- **🎨 Tailwind CSS** - Built with Tailwind CSS for easy customization
- **📦 TypeScript Support** - Full TypeScript support out of the box
- **🔧 Customizable** - Extend and customize components to match your brand

## 📦 Installation

```bash
npm install component-labs
```

Or using yarn:

```bash
yarn add component-labs
```

Or using pnpm:

```bash
pnpm add component-labs
```

### Requirements

This package requires the following peer dependencies:

- React ≥ 18
- React DOM ≥ 18
- Tailwind CSS ≥ 3.0 (or v4)
- Motion ≥ 12
- Lucide React ≥ 0.300.0

## ⚙️ Setup

### Step 1: Configure Tailwind CSS

Add the component-labs dist directory to your Tailwind configuration:

#### Tailwind v3 (`tailwind.config.js`)

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

#### Tailwind v4 (`index.css`)

```css
@import "tailwindcss";
@source "../node_modules/component-labs/dist";
```

### Step 2: Install Dependencies

Make sure all peer dependencies are installed in your project.

## 🎯 Quick Start

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

## 📚 Available Components

Our library includes a comprehensive collection of drop-in components organized by category:

### 🔘 Button Components

- `EncryptButton` - Button with encryption animation effect
- `FillButton` - Button with fill animation
- `MagnetButton` - Button with magnetic interaction
- `NeumorphismButton` - Neumorphic design button
- `GithubStarsButton` - GitHub stars counter button
- `UploadButton` - Upload action button

### 📇 Card Components

- `AgenticFlowCard` - Card with agentic flow visualization
- `DepthPerceptionCard` - Card with depth perception effect
- `PricingCard` - Professional pricing card
- `StateSynthesisCard` - Card with state synthesis visualization

### 📝 Form Components

- `CommandSearch` - Command palette search component
- `MinimalAuth` - Minimal authentication form
- `PromptBar` - Prompt/input bar component
- `RichComposer` - Rich text composer
- `GhostForm` - Ghost-style form component

### 📊 Grid Components

- `BentoStatsGrid` - Stats grid in bento layout
- `CrosshairFeatureGrid` - Feature grid with crosshair effect
- `MasonryShowcaseGrid` - Masonry layout showcase

### 🎬 Hero Components

- `DynamicHero` - Dynamic hero section
- `StaggeredEntranceHero` - Hero with staggered entrance animation

### 🏠 Home Page Components

- `NeuralTrace` - Neural network trace animation
- `TiltHoverCard` - Card with tilt hover effect
- `LinkNavigation` - Link-based navigation component

### ⌨️ Keyboard Components

- `MacKeyboard` - Mac-style keyboard display
- `MacKeyboardDark` - Dark mode Mac keyboard
- `TypewriterKeyboard` - Typewriter-style keyboard

### 🔗 Link Components

- `ClipPathLinks` - Links with clip-path animation
- `NeuralHoverLinks` - Links with neural network hover effect
- `TakeoverLinks` - Links with takeover animation

### 📋 Text Components

- `CreativeHighlightText` - Text with creative highlight effects
- `EncryptedText` - Text with encryption animation
- `StripeWriter` - Stripe-style text animation
- `VelocityText` - Text with velocity animation

### 🎨 Other Components

- `AnimatedFAQ` - Animated FAQ accordion
- `EditorialSlider` - Editorial-style image slider
- `KanbanBoard` - Interactive kanban board
- `TerminalTypingCard` - Terminal typing effect card

## 💡 Usage Examples

### Using CreativeHighlightText

```javascript
import { CreativeHighlightText } from "component-labs";

export default function Example() {
  return (
    <CreativeHighlightText
      text="Highlight important text with creative effects"
      highlightClassName="bg-gradient-to-r from-purple-400 to-pink-600"
    />
  );
}
```

### Using Multiple Components

```javascript
import { EncryptButton, PricingCard, DynamicHero } from "component-labs";

export default function App() {
  return (
    <div>
      <DynamicHero />
      <PricingCard />
      <EncryptButton onClick={() => console.log("Clicked!")} />
    </div>
  );
}
```

## 🎨 Customization

All components are built with Tailwind CSS, making them easily customizable through:

- **CSS Classes** - Pass custom Tailwind classes to components
- **Theme Extension** - Extend the Tailwind theme for your brand colors
- **Props** - Use component props to customize behavior and appearance

## 📖 Documentation

For detailed component documentation, visit the [Component Guide](./docs/COMPONENTS_GUIDE.md).

## 🌐 Live Demo

Check out the live demo and interactive examples:

👉 **[component-labs.vercel.app](https://component-labs.vercel.app/)**

## 🔗 Resources

- **[Component Labs Website](https://component-labs.vercel.app/)** - Interactive demo and showcase
- **[GitHub Repository](https://github.com/TakshPatel02/ComponentLabs)** - Source code and documentation
- **[NPM Package](https://www.npmjs.com/package/component-labs)** - Package registry

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues or pull requests on [GitHub](https://github.com/TakshPatel02/ComponentLabs).

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Support

If you find this project helpful, please consider:

- ⭐ Giving it a star on [GitHub](https://github.com/TakshPatel02/ComponentLabs)
- 📢 Sharing it with your network
- 🐛 Reporting bugs and suggesting features
- 🤝 Contributing to the project

---

**Made by [Taksh Patel](https://github.com/TakshPatel02)**
