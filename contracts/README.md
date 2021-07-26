# 1. Table of Contents
- [1. Table of Contents](#1-table-of-contents)
- [2. Environment Setup](#2-environment-setup)
- [3. Typescript Solidity Dev Starter Kit](#3-typescript-solidity-dev-starter-kit)
  - [3.1. Using this Project](#31-using-this-project)
  - [3.2. Available Functionality](#32-available-functionality)
    - [3.2.1. Build Contracts and Generate Typechain Typeings](#321-build-contracts-and-generate-typechain-typeings)
    - [3.2.2. Run Contract Tests & Get Callstacks](#322-run-contract-tests--get-callstacks)
    - [3.2.3. Run Contract Tests and Generate Gas Usage Report](#323-run-contract-tests-and-generate-gas-usage-report)
    - [3.2.4. Run Coverage Report for Tests](#324-run-coverage-report-for-tests)
    - [3.2.5. Deploy to Ethereum](#325-deploy-to-ethereum)
    - [3.2.6. Verify on Etherscan](#326-verify-on-etherscan)

# 2. Environment Setup
- Create ```.env``` file with following configuration:


- [ ] Ensure you do not commit private key information to GH.
- [ ] Ensure testnet account has sufficient funds to run operations.

```
INFURA_API_KEY=
ETHERSCAN_API_KEY=
RINKEBY_PRIVATE_KEY=
```


# 3. Typescript Solidity Dev Starter Kit

_Updated to use Hardhat!_

This is a starter kit for developing, testing, and deploying smart contracts with a full Typescript environment. This stack uses [Hardhat](https://hardhat.org) as the platform layer to orchestrate all the tasks. [Ethers](https://docs.ethers.io/v5/) is used for all Ethereum interactions and testing.

[Blog Post](https://medium.com/@rahulsethuram/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae)

## 3.1. Using this Project

Clone this repository, then install the dependencies with `npm install`. Build everything with `npm run build`. https://hardhat.org has excellent docs, and can be used as reference for extending this project.

## 3.2. Available Functionality

### 3.2.1. Build Contracts and Generate Typechain Typeings

`npm run compile`

### 3.2.2. Run Contract Tests & Get Callstacks

In one terminal run `npx hardhat node`

Then in another run `npm run test`

Notes:

- The gas usage table may be incomplete (the gas report currently needs to run with the `--network localhost` flag; see below).

### 3.2.3. Run Contract Tests and Generate Gas Usage Report

In one terminal run `npx hardhat node`

Then in another run `npm run test -- --network localhost`

Notes:

- When running with this `localhost` option, you get a gas report but may not get good callstacks
- See [here](https://github.com/cgewecke/eth-gas-reporter#installation-and-config) for how to configure the gas usage report.

### 3.2.4. Run Coverage Report for Tests

`npm run coverage`

Notes:

- running a coverage report currently deletes artifacts, so after each coverage run you will then need to run `npx hardhat clean` followed by `npm run build` before re-running tests
- the branch coverage is 75%

### 3.2.5. Deploy to Ethereum

Create/modify network config in `hardhat.config.ts` and add API key and private key, then run:

`npx hardhat run --network rinkeby scripts/deploy.ts`

### 3.2.6. Verify on Etherscan

Using the [hardhat-etherscan plugin](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html), add Etherscan API key to `hardhat.config.ts`, then run:

`npx hardhat verify --network rinkeby <DEPLOYED ADDRESS>`

PRs and feedback welcome!
