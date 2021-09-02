// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Holomi is ERC20 {
    address private minter;
    address private palgunamu;
    bool private roleCount = false;
   
    event MinterChanged(address indexed from, address to);
    
    constructor() ERC20("Holomi", "HLM"){
        minter = msg.sender;
    }
    
    function passMinterRole(address _caller, address _minter) public returns(bool) {
        require(roleCount == false, "[ ERROR ] Permission Denied : already passed once");
        require(_caller == minter, "[ ERROR ] Permission Denied : only owner can change pass minter role holomiminter");
        minter = _minter;
        roleCount = true;
        emit MinterChanged(msg.sender, _minter);
        
        return true;
    }
    
    function setApproveAddress(address _palgunamu) public{
        require(msg.sender == minter, "[ ERROR ] Permission Denied : msg.sender does not have role holomiapprove");
        palgunamu = _palgunamu;
    }
    
    function _setApprove(uint256 amount) private {
        approve(palgunamu, amount);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == minter, "[ ERROR ] Permission Denied : msg.sender does not have minter role");
        _setApprove(amount);
        _mint(to, amount);
    }

    function transferHolomi(address sender, address recipient,uint256 amount) public{
        require(msg.sender == minter, "[ ERROR ] Permission Denied : msg.sender does not have transfer role");
        _transfer(sender, recipient, amount);
    }
    
}