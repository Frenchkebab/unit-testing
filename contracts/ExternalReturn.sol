// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.4;

contract ExternalReturn {
    mapping(address => uint256) balances;

    function transfer(address _from, address _to) external returns (bool) {
        balances[_to] += 1;
        return true;
    }
}
