module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current', // Menggunakan versi Node.js yang sedang dijalankan
      },
    }],
  ],
};
