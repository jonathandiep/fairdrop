// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.6.11;

import "./MerkleDistributor.sol";

contract Fairdrop {
    struct AirdropData {
        address addr;
        string cid;
    }

    mapping(uint256 => AirdropData) public airdrops;
    uint256 public count = 0;

    event AirdropCreated(address indexed addr, uint256 id);

    function getAirdropAddress(uint256 _id) external view returns (address) {
        return airdrops[_id].addr;
    }

    function getAirdropCID(uint256 _id) external view returns (string memory) {
        return airdrops[_id].cid;
    }

    function addAirdrop(
        address _token,
        bytes32 _merkleRoot,
        string memory _cid
    ) external {
        require(
            airdrops[count].addr == 0x0000000000000000000000000000000000000000
        );
        address airdropAddress = address(
            new MerkleDistributor(_token, _merkleRoot)
        );
        airdrops[count] = AirdropData(airdropAddress, _cid);
        emit AirdropCreated(airdropAddress, count);
        count++;
    }
}
