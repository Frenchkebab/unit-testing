// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.4;

contract Accounts {
    // setBalance

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    function changeAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }
}
