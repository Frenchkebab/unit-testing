// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.4;

contract BigNumbers {
    uint256 public number;

    // setter
    function setNumber(uint256 newNumber) external {
        number = newNumber;
    }

    // setter
    function setToTheMax() external {
        number = type(uint256).max;
    }

    // getter
    function getNumber() external view returns (uint256) {
        return number;
    }
}
