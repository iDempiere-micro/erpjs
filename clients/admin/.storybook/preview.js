// import "../build/dist/App.svelte.css";
import "../src/main.css";

console.log('*** process.env.STORYBOOK_MOCK;', process.env.STORYBOOK_MOCK);
process.env.MOCK = process.env.STORYBOOK_MOCK;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
