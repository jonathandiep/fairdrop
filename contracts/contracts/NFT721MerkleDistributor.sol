// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.6.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/cryptography/MerkleProof.sol";
import "./interfaces/IMerkleDistributor.sol";

/// @title Merkle Distributor that is also the base contract for a 721
/// @author Jon Diep
/// @notice When claiming the NFT airdrop, the NFT gets minted based on the assigned tokenId in the merkle
contract NFT721MerkleDistributor is ERC721 {
    bytes32 public immutable merkleRoot;
    uint256 public MAX_COUNT;

    // This is a packed array of booleans.
    mapping(uint256 => uint256) private claimedBitMap;

    event Claimed(uint256 index, address account, uint256 amount);

    constructor(
        bytes32 merkleRoot_,
        string memory name_,
        string memory symbol_,
        uint256 maxCount_
    ) public ERC721(name_, symbol_) {
        merkleRoot = merkleRoot_;
        MAX_COUNT = maxCount_;
    }

    function isClaimed(uint256 index) public view returns (bool) {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        uint256 claimedWord = claimedBitMap[claimedWordIndex];
        uint256 mask = (1 << claimedBitIndex);
        return claimedWord & mask == mask;
    }

    function _setClaimed(uint256 index) private {
        uint256 claimedWordIndex = index / 256;
        uint256 claimedBitIndex = index % 256;
        claimedBitMap[claimedWordIndex] =
            claimedBitMap[claimedWordIndex] |
            (1 << claimedBitIndex);
    }

    function claim(
        uint256 index,
        address account,
        uint256 tokenId,
        bytes32[] calldata merkleProof
    ) external {
        require(!isClaimed(index), "MerkleDistributor: Drop already claimed.");

        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(index, account, tokenId));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, node),
            "MerkleDistributor: Invalid proof."
        );

        // Mark it claimed and send the token.
        _setClaimed(index);
        _safeMint(account, tokenId);
        require(
            ownerOf(tokenId) == account,
            "MerkleDistributor: Transfer failed."
        );

        emit Claimed(index, account, tokenId);
    }
}
