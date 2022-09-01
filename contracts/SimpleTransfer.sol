// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.4;

contract SimpleTransfer {
    mapping(address => uint256) public accounts;

    function deposit() external payable {
        accounts[msg.sender] += msg.value;
    }

    function withdraw() external {
        // always update the internal state first before making an external call
        uint256 _balance = accounts[msg.sender];
        delete accounts[msg.sender];

        payable(msg.sender).transfer(_balance);
    }
}
