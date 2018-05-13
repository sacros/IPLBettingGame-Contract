module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  deploy: [
    "IPLGame"
  ],
  networks: {
    development: {
      host: "localhost",
      port: "7545",
      network_id: "5777"
    }
  }
};
