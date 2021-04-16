const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
module.exports = {
  future: { // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include base index.html
    ],
    enabled: production // disable purge in dev
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled']
    }
  },
};
