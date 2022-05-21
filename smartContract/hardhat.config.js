
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const Private_key = process.env.Private_key;

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/SGZwIG8GDtO8k7LLTHN_mvTXjabwpS22",
      accounts: [Private_key]
    }
  }
}


//0x5FbDB2315678afecb367f032d93F642f64180aa3
