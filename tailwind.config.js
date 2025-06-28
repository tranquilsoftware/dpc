/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {

// Modern Gray Scale with White Text
// background: {
//   DEFAULT: "#F5F5F5",      // Light gray background
//   secondary: "#E5E7EB",   // Slightly darker light gray
//   dark: "#1A1D23",         // Dark gray for dark mode
//   light: "#F3F4F6"        // Very light gray for light mode
// },
// primary: {
//   DEFAULT: "#E5E7EB",      // Light gray as primary
//   light: "#F3F4F6",       // Lighter gray
//   dark: "#D1D5DB",         // Slightly darker light gray
//   foreground: "#FFFFFF"    // White text
// },
// accent: {
//   DEFAULT: "#E5E7EB",      // Light gray accent
//   light: "#F3F4F6",        // Lighter gray
//   dark: "#D1D5DB",         // Slightly darker light gray
//   foreground: "#FFFFFF"    // White text
// },
// content: {
//   DEFAULT: "#FFFFFF",      // White for body text
//   serious: "#F9FAFB",     // Slightly off-white for important text
//   white: "#FFFFFF",
//   primary: "#FFFFFF",      // White for primary content
//   secondary: "#E5E7EB",   // Light gray for secondary content
//   tertiary: "#D1D5DB",    // Slightly darker light gray for tertiary content
//   muted: "#9CA3AF"        // Medium gray for muted text
// },
// border: {
//   DEFAULT: "#D1D5DB",     // Light gray border
//   light: "#E5E7EB",       // Very light gray for subtle borders
//   dark: "#9CA3AF"         // Medium gray for strong borders
// }
background: {
  DEFAULT: "#f8e8d6",      // Warm off-white background
  secondary: "#F5EDE0",   // Slightly warmer off-white
  dark: "#2A2118",         // Warm dark brown for dark mode
  light: "#FDF6E9"        // Very light creamy white
},
primary: {
  DEFAULT: "#F0E6D2",      // Warm light beige as primary
  light: "#F8F2E6",       // Lighter creamy beige
  dark: "#E8D9B5",         // Slightly darker warm beige
  foreground: "#2A2118"    // Dark brown text for contrast
},
accent: {
  DEFAULT: "#E8D9B5",      // Warm beige accent
  light: "#F0E6D2",        // Lighter warm beige
  dark: "#D9C7A0",         // Slightly darker warm beige
  foreground: "#2A2118"    // Dark brown text for contrast
},
content: {
  DEFAULT: "#2A2118",      // Dark brown for body text
  dark: "#2A2118",         // Dark brown for dark mode
  serious: "#3D3429",     // Slightly lighter dark brown for important text
  white: "#FFF8F0",       // Off-white
  primary: "#2A2118",      // Dark brown for primary content
  secondary: "#5C5347",   // Medium warm brown for secondary content
  tertiary: "#8A8070",    // Warm gray-brown for tertiary content
  muted: "#A69B8A"        // Muted warm gray for subtle text
},
border: {
  DEFAULT: "#D9C7A0",     // Warm beige border
  light: "#E8D9B5",       // Light warm beige for subtle borders
  dark: "#8A8070"         // Warm gray-brown for strong borders
}
      }
    }
  },
  // plugins: [
  //   plugin(function({ addBase }) {
  //     addBase({
  //       ':root': {
  //         '--primary': '#5B8A5E',     // Muted sage green
  //         '--secondary': '#A68A64',   // Muted clay
  //         '--accent': '#C4B094',      // Soft clay
  //         // '--background': '#477751',  // Deep forest green
  //       }
  //     })
  //   })
  // ]
}
