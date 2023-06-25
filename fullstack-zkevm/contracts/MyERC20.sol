// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {
    constructor() ERC20("MyERC20", "ME") {}

    // for testing purpose
    function mint(address account, uint256 amount) public virtual returns (bool) {
        _mint(account, amount);
        return true;
    }

    function distribute(address from, address[] memory to, uint256[] memory amount, uint total) public {
        // uint balance = balanceOf(from);
        // bool approved = approve(from, balance);
        // if (approved) {
        for(uint8 i = 0; i < total; i++) {
            transferFrom(from, to[i], amount[i]);
        }
        // }
       
    }
}
