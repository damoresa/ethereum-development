'use strict';

const path = require('path');

// Infura API key and Metamask 12 word mnemonic, keep these secrets on your .gitignore!
const SECRETS = require('./../secrets');

const INFURA_API_KEY = process.env.INFURA_API_KEY || SECRETS.INFURA.API;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY || SECRETS.METAMASK.PRIVATE_KEY;

const CONSTANTS = {
    'DATE_FORMAT': 'DD/MM/YYYY',
    'SMART_CONTRACT': {
        'CALLER': process.env.CONTRACT_CALLER || '0xeF0c242dcA609a5e85918f4188e6e300004e4798',
        'GAS_LIMIT': process.env.CONTRACT_GASLIMIT || 1000000,
        'HASH': process.env.CONTRACT_HASH || '0x6a5cee648161d24da2ce0c504b18d2c268b96df8',
        'PATH': path.resolve(__dirname, '..', 'build-network', 'contracts', 'Chat.json'),
    },
    'WEB3': {
        'PROVIDER': process.env.CONTRACT_HOST || `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
        'PRIVATE_KEY': Buffer.from(METAMASK_PRIVATE_KEY, 'hex'),
        'TRANSACTION': {
            'ERROR': '0x0',
            'OK': '0x1',
        },
    },
};

module.exports = CONSTANTS;