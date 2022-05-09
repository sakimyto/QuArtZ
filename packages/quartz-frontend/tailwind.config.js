module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "'Press Start 2P'",
          "'Helvetica Neue'",
          'Arial',
          "'Hiragino Kaku Gothic ProN'",
          "'Hiragino Sans'",
          'Meiryo',
          'sans-serif',
        ],
        ps2p: ["'Press Start 2P'", 'cursive'],
      },
    },
  },
  plugins: [],
};
