import { ethers } from 'hardhat';

async function main() {
  const Fairdrop = await ethers.getContractFactory('Fairdrop');
  const fairdrop = await Fairdrop.deploy();

  await fairdrop.deployed();

  console.log(`Fairdrop deployed to: ${fairdrop.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
