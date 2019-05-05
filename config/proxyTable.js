const {API_SERVER, API_PREFIX} = require("./myConfig");
module.exports = {
  [API_PREFIX]: {
    target: API_SERVER,
      ws: true,
      logLevel: 'debug',
      changeOrigin: true,
  },
};
