module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require("@tailwindcss/typography")
  ],
  daisyui: {
    styled: true,
    // TODO: Theme needs works
    themes: [
      {
        'dopleganga': {
          fontFamily: {
            display: ['PT Mono, monospace'],
            body: ['Inter, sans-serif'],
          },
          'primary': '#23272a',           /* Primary color */
          'primary-focus': '#36393f',     /* Primary color - focused */
          'primary-content': '#f3f3f3',   /* Foreground content color to use on primary color */

          'secondary': '#444950',         /* Secondary color */
          'secondary-focus': '#5a5f66',   /* Secondary color - focused */
          'secondary-content': '#f3f3f3', /* Foreground content color to use on secondary color */

          'accent': '#6c6f73',            /* Accent color */
          'accent-focus': '#8a8d91',      /* Accent color - focused */
          'accent-content': '#f3f3f3',    /* Foreground content color to use on accent color */

          'neutral': '#181a1b',           /* Neutral color */
          'neutral-focus': '#23272a',     /* Neutral color - focused */
          'neutral-content': '#f3f3f3',   /* Foreground content color to use on neutral color */

          'base-100': '#181a1b',          /* Base color of page, used for blank backgrounds */
          'base-200': '#23272a',          /* Base color, a little darker */
          'base-300': '#36393f',          /* Base color, even more darker */
          'base-content': '#f9fafb',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      // backup themes:
      // 'dark',
      // 'synthwave'
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}