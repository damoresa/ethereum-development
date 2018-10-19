## Ethereum development

The purpose of this repository is to serve as a step by step 
guide to install all the recommended tools for _smart contract_ 
development and to deploy said _smart contracts_ on the _Ethereum_ 
networks - in the example we'll be deploying it to the _Ropsten_ 
testnet, but the process should be the same for every other network 
out there.

This repository will also cover how to get funds on blockchain testnets 
in order to deploy your contracts and run tests in them.

You can see more detailed information on 
[this](https://medium.com/@damoresac/developing-ethereum-smart-contracts-ef36ee4574c0) 
_Medium_ article.

Now, in order to keep it as simple as possible, we'll be using 
the _[Truffle framework]_ in order to generate a local _blockchain_ 
instance and use it's tooling for testing, compiling and deployments.

We'll also try to cover _[Metamask]_ in order to manage our wallets 
and interact with the blockchain via our browser in case it's required.

Last but not least, we'll be using _[Infura]_ to avoid having to 
create our own testnet blockchain node in order to deploy our 
contracts. _Infura_ is a public _Ethereum_ node you can use to 
access the network without connecting to it yourself.

[Truffle framework]: https://truffleframework.com
[Metamask]: https://metamask.io/
[Infura]: https://infura.io/

### Installing the tools

1. Install _windows-build-tools_. You'll need these to build some of 
the tools that will be downloaded later on the tutorial.

```bash
npm install -g windows-build-tools
```

1. Install _Truffle_
```bash
npm install -g truffle
```

1. Install _Ganache_ and _Ganache CLI_
```bash
# Download the appropiate Ganache distribution from the Github releases
# https://github.com/trufflesuite/ganache/releases

# Install the CLI
npm install -g ganache-cli
```
__NOTE__: This guide has been tested with the following versions: 
* _Truffle_: 4.1.14
* _Ganache_: 1.2.2
* _Ganache CLI_: 6.1.8

1. Install _Metamask_:

This step is easy enough as in you can just install the plugin 
for your browser straight up from the official _Metamask_ site.

In order to configure it, you'll be prompted for a password the 
very first time you open up the plugin. After introducing your 
password, you'll have to go through the usual legal yada yada and 
finally you'll be provided with the mnemonic 12 words phrase that 
you can use to recover your _Metamask_ account. It is __very 
important__ that you store that mnemonic safely and you never 
share it with anyone, as it can compromise your account and 
all of it's _Ether_.

After storing your mnemonic, you're done with _Metamask_'s 
installation and configuration and you're able to send funds to 
it's generated account.

##### Truffle CLI on Windows disclaimer

It is important to note that when executing the _truffle_ command 
on any terminal on Windows, the OS will try to execute the _truffle.js_ 
configuration file instead of invoking the CLI command.

An easy workaround for this is to invoke _truffle.cmd_ explicitly.
```bash
truffle.cmd compile
```

### Scaffolding your first project

_Truffle_ provides developers with the concept of _boxes_. Said 
boxes provide helpful boilerplates that allow developers to focus 
on developing their _dapp_ rather than spending time structuring 
the entire project.

You can browse the list of existing boxes or even submit a new one 
at the [Truffle Boxes] site.

[Truffle Boxes]: https://truffleframework.com/boxes

When you've chosen a box, all you have to do is download it 
using the _unbox_ command.
```bash
truffle unbox <box-name>
```
If you wish to start a new project with no special scaffold on it, 
you can use the _init_ command to scaffold an empty project.
```bash
truffle init
```
__IMPORTANT__: As of 27/09/2018, _Truffle_ doesn't seem to support 
working behind a corporate proxy, meaning you have to scaffold 
your project by downloading the _[Truffle init default]_ repository.

[Truffle init default]: https://github.com/trufflesuite/truffle-init-default

### Getting funds 

Getting funds on the main network is _as easy_ as buying _Ether_ on 
any stock house.

### Deploying on _Ganache_

This section covers the process of deploying your _smart contract_ to 
a local _Ganache_ instance.

1. Configure your _truffle.js_ to point to the _Ganache_ server
```javascript
// Changed port to 7545 to support Ganache testing
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
```

1. Execute the migration task:
```bash
truffle migrate
```

1. Now you can see your _smart contract_ on _Ganache_ and you can also 
interact with it via any client like _Web3js_.

### Deploying on the Ropsten testnet

First of all, you have to get some _Ropsten_ ether. You can try 
any of the following faucets to allocate some ether on your 
_Metamask_ account:

1. [Ropsten Ethereum Faucet]
1. [Test Ether Faucet]
1. [bitfwd Ropsten Faucet]

[Ropsten Ethereum Faucet]: https://faucet.ropsten.be/
[Test Ether Faucet]: https://faucet.metamask.io/
[bitfwd Ropsten Faucet]: http://faucet.bitfwd.xyz/

Faucets will help you get ether by sending you a set amoutn of 
ether on request. Do not get greedy or you'll be greylisted or 
blocked from the faucets.

Once you've allocated some funds on your _Metamask_ account, 
it's time to configure _Truffle_ to handle the contract deployment.
Get to the _truffle.js_ file and change it as shown in the 
following snippet:

```javascript
'use strict';

// We will be using this provider to hook our Metamask wallet
const HDWalletProvider = require('truffle-hdwallet-provider');

// Keep your secrets file on gitignore or set them on environment variables
const SECRETS = require('./secrets');

// We'll be using the Metamask mnemonic to hook with the wallet
// We'll also be using our Infura account to avoid creating a local 
// blockchain to connect to the testnet.
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
        // Configure the Ropsten network
        ropsten: {
            provider: function () {
                return new HDWalletProvider(ROPSTEN_MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
            },
            network_id: 3
        }
    }
};
```

Once we're set with the configurations, all we have to do is 
deploy the contract using _Truffle_ as follows:

```bash
truffle migrate --network ropsten
```

This command will have _Truffle_ connect to _Ropsten_ via 
_Infura_ and deploy our smart contract using our _Metamask_ 
wallet for funds.

Last but not least, we can test our deployed contract with 
_Truffle_ using _exec_.  
_exec_ will let you execute scripts on a network of your choice. 
You can find an example script that creates some rooms and 
then retrieves their information under the __queries__ folder on 
this repository. All you need is the contract _hash_ generated 
after it's deployed.

In order to execute _exec_ you have to use the following command:
 
```bash
truffle exec queries\queries.js --network ropsten
```

### Invoking your _smart contract_ from a webapp

You can check the _NodeJS_ clients under the __clients__ folder.  
It is as easy as invoking the service from any _NodeJS_ process - 
such as an API - to get your client going.

An important note is that you have to configure your _caller_ 
and _contract_ hashes on the configuration file.

A _smart contract_ util too has also been implemented to allow 
instantiating the contract handler only once and easing all the 
contract management.

### Network gas price

In order to calculate the _gas price_ you use for your transactions 
you can use [Eth gas station]. The 
_gas price_ will determine how quickly your transaction is mined by 
the nodes in the network - the more you pay, the faster it gets mined.

The _NodeJS client_ provided within this example allocates the low, 
standard and high _gas prices_ from the [Eth gas station] and uses 
the standard one in order to keep the gas usage optimal.

[Eth gas station]: https://ethgasstation.info/
