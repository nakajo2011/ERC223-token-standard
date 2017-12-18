pragma solidity ^0.4.11;


import './ERC223/ERC223_token.sol';


contract SampleToken is ERC223Token {

  /**
   * constructor
  */
  function SampleToken() public {
    balances[msg.sender] = 1000;
  }
}
