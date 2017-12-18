pragma solidity ^0.4.11;


/**
* @title Contract that will work with ERC223 tokens.
*/

contract ReceiverNotImpl {

  address public sender;

  uint public anyValue;

  function deposit(address _from, uint _value, bytes _data) public {
    sender = _from;
    anyValue = _value;
  }

}
