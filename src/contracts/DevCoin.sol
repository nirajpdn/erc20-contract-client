// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DevCoin is ERC20 {
    constructor() ERC20("DevCoin", "DEV") {
        _mint(msg.sender, 1000 * 10**18);
    }
}
