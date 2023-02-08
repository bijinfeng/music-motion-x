/* eslint-disable import/no-extraneous-dependencies */
const tailwindcss = require("tailwindcss");
const presetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [presetEnv, tailwindcss, autoprefixer],
};
