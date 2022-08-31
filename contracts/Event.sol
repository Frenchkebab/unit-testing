// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.4;

contract Event {
    event ImportantMessage(address);
    event EmptyMessage();

    function emitEventWithAddress() external {
        emit ImportantMessage(msg.sender);
    }

    function emitEmptyMessage() external {
        emit EmptyMessage();
    }
}
