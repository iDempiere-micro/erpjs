const smelteTailwind = require('./src/absorb/smelte/tailwind.config');
module.exports = {
  ...smelteTailwind({
    //README config taken from https://smeltejs.com doc
    colors: {
      primary: "#b027b0",
      secondary: "#009688",
      error: "#f44336",
      success: "#4caf50",
      alert: "#ff9800",
      blue: "#2196f3",
      dark: "#212121"
    }, // Object of colors to generate a palette from, and then all the utility classes
    darkMode: true,
  }),
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.svelte'],
    options: {
      extractors: [{
        extractor: require('./src/absorb/smelte/src/utils/css-extractor.js'),
        extensions: ['svelte']
      },],
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled']
    }
  },
};
