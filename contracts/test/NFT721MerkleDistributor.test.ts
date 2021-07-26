import { ethers, network } from 'hardhat';
import { Contract, Signer } from 'ethers';
import { expect } from 'chai';

import MerkleData from './mock/nft721-merkle.json';

describe.only('NFT721MerkleDistributor', () => {
  let signers: Signer[];
  let deployer: Signer;
  let nftMerkleDistributor: Contract;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    deployer = signers[0];

    const NFTMerkleDistributor = await ethers.getContractFactory(
      'NFT721MerkleDistributor',
      deployer
    );
    nftMerkleDistributor = await NFTMerkleDistributor.deploy(
      MerkleData.merkleRoot,
      'Cool NFT',
      'cnft',
      100
    );

    const contract = await nftMerkleDistributor.deployed();
    console.log(`contract deployed: ${contract.address}`);
  });

  it('successfully claim NFT airdrop', async () => {
    const claimerAddr = '0xC7AA922f0823DeE2eD721E61ebCCF2F9596017Fb';

    await network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [claimerAddr],
    });

    // impersonated account needs some ether
    await deployer.sendTransaction({
      to: claimerAddr,
      value: ethers.utils.parseEther('1'),
    });

    const claimer = await ethers.provider.getSigner(claimerAddr);
    const claimData = MerkleData.claims[claimerAddr];

    await nftMerkleDistributor
      .connect(claimer)
      .claim(claimData.index, claimerAddr, claimData.amount, claimData.proof);
    expect(await nftMerkleDistributor.ownerOf(claimData.amount)).to.equal(
      claimerAddr
    );
    expect(await nftMerkleDistributor.isClaimed(claimData.index)).to.be.true;

    // should fail when trying to claim again
    try {
      await nftMerkleDistributor
        .connect(claimer)
        .claim(claimData.index, claimerAddr, claimData.amount, claimData.proof);
    } catch (err) {
      expect(err.message).to.include(
        'MerkleDistributor: Drop already claimed.'
      );
    }
  });
});
