import { ethers } from 'hardhat';

async function main() {
  const ERC20 = await ethers.getContractFactory('TestERC20');
  const erc20 = await ERC20.deploy(
    'Macaroni and Cheese Token',
    'MAC',
    ethers.utils.parseEther('69420')
  );

  await erc20.deployed();

  console.log(`ERC20 token deployed to: ${erc20.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
