require('@nomiclabs/hardhat-ethers');
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.18",

  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.ALCHEMY_MAINNET_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  }

  // paths: {
  //   artifacts: "./src",
  // },
  // networks: {
  //   zkEVM: {
  //     url: `https://rpc.public.zkevm-test.net`,
  //     accounts: process.env.ACCOUNT_PRIVATE_KEY,
  //   },
  // },
};
