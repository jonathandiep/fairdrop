import { ethers, network } from 'hardhat';
import { Contract, Signer } from 'ethers';
import { expect } from 'chai';

import MerkleDistributor from '../artifacts/contracts/MerkleDistributor.sol/MerkleDistributor.json';
import MerkleData from './mock/merkle.json';

describe('Fairdrop', () => {
  let signers: Signer[];
  let deployer: Signer;
  let fairdrop: Contract;
  let testToken: Contract;
  let testTokenAirdrop: Contract;

  const cid = 'QmPpR4sm2JTLWTXx3kvxkG1PDncocmcdbLuuVVPG3vzhvS';

  beforeEach(async () => {
    signers = await ethers.getSigners();
    deployer = signers[0];

    // Deploy Fairdrop contract
    const Fairdrop = await ethers.getContractFactory('Fairdrop', deployer);
    fairdrop = await Fairdrop.deploy();
    await fairdrop.deployed();

    // Create test token
    const TestERC20 = await ethers.getContractFactory('TestERC20', deployer);
    testToken = await TestERC20.deploy('Cool Token Name', 'PONZI', 69420);

    // Create merkle contract
    const tx = await fairdrop.addAirdrop(
      testToken.address,
      MerkleData.merkleRoot,
      cid
    );
    await tx.wait();

    // Transfer 552 TestToken to merkle contract (# from tokenTotal in merkle)
    const testTokenAirdropAddr = await fairdrop.getAirdropAddress(0);
    testTokenAirdrop = new ethers.Contract(
      testTokenAirdropAddr,
      MerkleDistributor.abi,
      deployer
    );
    testToken.transfer(testTokenAirdropAddr, MerkleData.tokenTotal);
  });

  it('expect count to increase', async () => {
    expect(await fairdrop.count()).to.equal(1);

    await fairdrop.addAirdrop(
      '0x6b175474e89094c44da98b954eedeac495271d0f',
      MerkleData.merkleRoot,
      cid
    );

    expect(await fairdrop.count()).to.equal(2);

    await fairdrop.addAirdrop(
      '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      MerkleData.merkleRoot,
      cid
    );

    expect(await fairdrop.count()).to.equal(3);
  });

  it('test valid airdrop address', async () => {
    const claimerAddr = '0x61C808D82A3Ac53231750daDc13c777b59310bD9';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [claimerAddr],
    });

    // impersonated account needs some ether
    deployer.sendTransaction({
      to: claimerAddr,
      value: ethers.utils.parseEther('1'),
    });

    const claimer = await ethers.provider.getSigner(claimerAddr);
    const claimData = MerkleData.claims[claimerAddr];

    expect((await testToken.balanceOf(claimerAddr)).toString()).to.equal('0');
    expect(await testTokenAirdrop.isClaimed(claimData.index)).to.be.false;

    const tx = await testTokenAirdrop
      .connect(claimer)
      .claim(claimData.index, claimerAddr, claimData.amount, claimData.proof);
    await tx.wait();

    expect((await testToken.balanceOf(claimerAddr)).toString()).to.equal('69');
    expect(await testTokenAirdrop.isClaimed(claimData.index)).to.be.true;

    // should fail when trying to claim again
    try {
      await testTokenAirdrop
        .connect(claimer)
        .claim(claimData.index, claimerAddr, claimData.amount, claimData.proof);
    } catch (err) {
      expect(err.message).to.include(
        'revert MerkleDistributor: Drop already claimed.'
      );
    }
  });
});
