![Marmo](./images/logo.png)
Marmo wallet JS SDK.

# Simple Summary
Allowing users to sign messages to show intent of execution, but allowing a third party relayer to execute them is an emerging pattern being used in many projects. 
This pattern simplifies the integration with any Ethereum based platform. 
Marmo relayer: (https://github.com/ripio/marmo-relayer). 

# Abstract
### User pain points:
> - Users don't want to think about ether
> - Users want to be able to pay for transactions using whatever they have 
> - Users don’t want to download apps/extensions (at least on the desktop) to connect to their apps

# Ecosystem Graph
![](./images/01.png)

###### General WIKI ecosystem.
- Work in progress.
###### API layer
- Marmo relayer doc: (https://github.com/ripio/marmo-relayer/blob/master/README.md)
###### CORE layer
- Marmo contracts doc: (https://github.com/ripio/marmo-contracts/blob/master/README.md)

# Features
- Complete implementation of Intent functionality for Marmo relay.
- Ethereum wallet support.
- Comprehensive integration tests demonstrating a number of the above scenarios.

##### Runtime dependencies:

- Webpack
- Mocha
- Chai
- Web3
- Eslint
- TypeScript

# Getting started

##### Prerequisites

* Node.js
* npm

```bash
# On Linux:
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

```bash
# On Mac:
sudo brew update
sudo brew install nodejs
sudo brew install npm
```

### Building (webpack)
```bash
npm build
```

### Testing (Mocha)
```bash
npm test
```

#### Add the relevant dependency to your project:
##### NPM
```bash
npm i marmojs-sdk
```

# how it works?

### Intent Flowchart
![](./images/02.png)

###### Dependencies
> - T0  -> -
> - T1  -> - 
> - T2  -> T1
> - T3  -> T1
> - T4  -> T1
> - T5  -> T1, T4
> - T6  -> T2
> - T7  -> T2
> - T8  -> T2
> - T9  -> T3
> - T10 -> T4
> - T11 -> T5
> - T12 -> T6
> - T13 -> T7
> - T14 -> T8
> - T15 -> T9
> - T16 -> T10
> - T17 -> T10
> - T18 -> T11
> - T19 -> T13
> - T20 -> T14
> - T21 -> T15
> - T22 -> T18
> - T23 -> T19
> - T24 -> T21
> - T25 -> T22
> - T26 -> T12, T23, T20, T15
> - T27 -> T24
> - T28 -> T25
> - T29 -> T27


### Build a intent
```js
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.transfer(to, 1);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xDc3914BEd4Fc2E387d0388B2E3868e671c143944";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withWallet(contractAddress)
    .withIntentAction(intentAction)

let intent: Intent = intentBuilder.build();
```

### Sign a intent
```js
const signedIntent: SignedIntent = Utils.sign(intent, "Private key");
```

###  Send a intent
```js

let relayClient: RelayClient = new RelayClient("http://ec2-3-16-37-20.us-east-2.compute.amazonaws.com/relay");
relayClient.sent(signedIntent);

 # Post Example
 {
  "id": "0xacd5d801cecc1790b95c5395e4f48a40d964ae0c6b70051b3c907060e67da079",
  "dependencies": [
    "0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e",
    "0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928"
  ],
  "wallet": "0xbbf289d846208c16edc8474705c748aff07732db",
  "tx": {
    "to": "0x2f45b6fb2f28a73f110400386da31044b2e953d4",
    "value": 0,
    "data": "0x70a082310000000000000000000000007f5eb5bb5cf88cfcee9613368636f458800e62cb",
    "minGasLimit": 300000,
    "maxGasPrice": 999999
  },
  "salt": "0x0000000000000000000000000000000000000000000000000000000000000002",
  "signer": "0x9d7713f5048c270d7c1dbe65f44644f4ea47f774",
  "signature": {
    "r": "0xed4eee4e05337e598b1886ef3941f775833f2c7e55bc233fe2cd66d032029649",
    "s": "0x502acc54e8c1ecb4d845a56afb1e43829743c77f3dd60c8b74b25cef33cd1b1e",
    "v": "0x1b"
  }
}
```

# Structure of builder

| Name                  | Type          | Mandatory | Default       | Description                                              |
| --------              | --------      | --------  | --------      | --------                                                 |
| id                    | string        | yes       | Autogenerated | A unique identifier for the intent.                      |
| dependencies          | string[]      | no        | Empty         | Define a correlation id for intent.                      |
| signer                | string        | yes       | -             | The address of the signer that sign the intent.          |
| wallet                | string        | yes       | -             | Contract address or Marmo instance.                      |
| salt                  | number        | no        | 0x0           | Use to send the same intent many times if needed.       |
| minGasLimit           | number        | no        | 0             | Minimum gas price.                                       |
| maxGasPrice           | number        | no        | 99999999      | Maximum gas price.                                       |
| intentAction          | IntentAction  | yes       | 0x0           | IntentAction Example ->  |

# Examples

```js
/*
    Test with:
    - ERC20 Transfer
    - 1 Token
    - Signer
    - Wallet (0xDc3914BEd4Fc2E387d0388B2E3868e671c143944)
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.transfer(to, 1);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xDc3914BEd4Fc2E387d0388B2E3868e671c143944";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withWallet(contractAddress)
    .withIntentAction(intentAction)

let intent: Intent = intentBuilder.build();
```

```js
/*
    Test with:
    - balanceOf
    - Signer
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withWallet(contractAddress)
    .withIntentAction(intentAction)

let intent: Intent = intentBuilder.build();
```

```js
/*
    Test with:
    - balanceOf
    - Signer
    - dependencies (0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e)
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e'])
    .withWallet(contractAddress)
    .withIntentAction(intentAction)

let intent: Intent = intentBuilder.build();
```

```js
/*
    Test with:
    - balanceOf
    - Signer
    - dependencies (
        0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e, 
        0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928
    )
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withDependencies([
        '0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', 
        '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'
    ])
    .withWallet(contractAddress)
    .withIntentAction(intentAction)

let intent: Intent = intentBuilder.build();
```

```js
/*
Test with:
    - balanceOf
    - Signer
    - dependencies (
        0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e, 
        0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928
    )
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - Min gas 300000
    - Max gas 999999
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
    .withWallet(contractAddress)
    .withIntentAction(intentAction)
    .withMinGasLimit(300000)
    .withMaxGasLimit(999999)

let intent: Intent = intentBuilder.build();
```

```js
/*
Test with:
    - balanceOf
    - Signer
    - dependencies (
        0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e, 
        0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928
    )
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - Min gas 300000
    - Max gas 999999
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
    - Salt (0x0000000000000000000000000000000000000000000000000000000000000001)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
    .withWallet(contractAddress)
    .withIntentAction(intentAction)
    .withMinGasLimit(300000)
    .withMaxGasLimit(999999)
    .withSalt(1)

let intent: Intent = intentBuilder.build();
```

```js
/*
    Test with:
    - balanceOf
    - Signer
    - dependencies (0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e, 0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928)
    - Wallet (0x692a70d2e424a56d2c6c27aa97d1a86395877b3a)
    - Min gas 300000
    - Max gas 999999
    - IntentAction (0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB, 1)
    - Salt (0x0000000000000000000000000000000000000000000000000000000000000002)
*/
let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let erc20: ERC20 = new ERC20(tokenContractAddress);
let intentAction: IntentAction = erc20.balanceOf(to);
const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
let intentBuilder: IntentBuilder = new IntentBuilder();
intentBuilder.withSigner(credentials.address)
    .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
    .withWallet(contractAddress)
    .withIntentAction(intentAction)
    .withMinGasLimit(300000)
    .withMaxGasLimit(999999)
    .withSalt(2)

let intent: Intent = intentBuilder.build();
```

### Other implementations
 - Java [marmoj-sdk](https://github.com/ripio/marmoj-sdk)
 - Python [marmopy-sdk](https://github.com/ripio/marmopy-sdk)

