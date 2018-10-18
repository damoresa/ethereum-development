'use strict';

const HDWalletProvider = require('truffle-hdwallet-provider');

// Infura API key and Metamask 12 word mnemonic, keep these secrets on your .gitignore!
const SECRETS = require('./secrets');

const ROPSTEN_MNEMONIC = process.env.TRUFFLE_ROPSTEN_MNEMONIC || SECRETS.METAMASK.MNEMONIC;
const INFURA_API_KEY = process.env.INFURA_API_KEY || SECRETS.INFURA.API;

// Changed port to 7545 to support Ganache testing
module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(ROPSTEN_MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
            },
            network_id: 3
        }
    }
};
