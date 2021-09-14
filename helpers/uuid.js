// This module is a simple one as it just generates a random string of letters and numbers that acts as an ID
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
