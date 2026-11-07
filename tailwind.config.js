/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  // system.css (public/assets) is the base layer; Tailwind's reset would override it.
  corePlugins: { preflight: false, inset: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Host Grotesk"', 'system-ui', 'sans-serif'],
      },
      // The design tokens, so any utility uses the live (light or dark) values.
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        line: 'var(--line)',
      },
    },
  },
  plugins: [],
};
