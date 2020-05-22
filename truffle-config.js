const path = require("path");

module.exports = {
  contracts_directory: path.join(__dirname, "contracts"),
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  migrations_directory: path.join(__dirname, "migrations"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
};
