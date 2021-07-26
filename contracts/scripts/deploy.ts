import { ethers } from "hardhat";

async function main() {
  const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'
  const tokenFactory = await ethers.getContractFactory("TestERC20");
  const merkleFactory = await ethers.getContractFactory("MerkleDistributor");

  // If we had constructor arguments, they would be passed into deploy()
  let [deployer] = await ethers.getSigners();
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  let tokenContract = await tokenFactory.deploy('Token', 'TKN', 0);

  console.log(
      `The address the Contract WILL have once mined: ${tokenContract.address}`
  );

  console.log(
      `The transaction that was sent to the network to deploy the Contract: ${
          tokenContract.deployTransaction.hash
      }`
  );

  console.log(
      'The contract is NOT deployed yet; we must wait until it is mined...'
  );
  await tokenContract.deployed();
  console.log('Mined TokenContract!');

  let merkleContract = await merkleFactory.deploy(tokenContract.address, ZERO_BYTES32);

  console.log(
    `The address the Contract WILL have once mined: ${merkleContract.address}`
  );

  console.log(
    `The transaction that was sent to the network to deploy the Contract: ${merkleContract.deployTransaction.hash
    }`
  );

  console.log(
    'The contract is NOT deployed yet; we must wait until it is mined...'
  );
  await merkleContract.deployed();
  console.log('Mined MerkleContract!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
