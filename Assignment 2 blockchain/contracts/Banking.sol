//SPDX-License-Identifier: UNLICENSED
pragma solidity >0.5.0;

contract Banking {

mapping (address => uint) private balances;
    //Function that should deposit 
    function deposit() public payable returns (uint) {
        balances[msg.sender] += msg.value;
        return balances[msg.sender];
    }
    //Function that should withdraw an amount
    function withdraw(uint withdrawAmount) public returns (uint remainingBalance) {
        if (withdrawAmount <= balances[msg.sender]) {
            balances[msg.sender] -= withdrawAmount;
            payable(msg.sender).transfer(withdrawAmount);
        }
        return balances[msg.sender];
    }
    //Function that returns the balance
   function balance() public view returns (uint) {
        return balances[msg.sender];
    }

}