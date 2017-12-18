pragma solidity ^0.4.11;


import '../contracts/token/ERC223/ERC223_receiving_contract.sol';


/**
* @title Contract that will work with ERC223 tokens.
*/

contract ReceiverImpl is ERC223ReceivingContract {
  address public sender;

  uint256 public anyValue;


  /**
   * @dev Standard ERC223 function that will handle incoming token transfers.
   *
   * @param _from  Token sender address.
   * @param _value Amount of tokens.
   * @param _data  Transaction metadata.
   */
  function tokenFallback(address _from, uint _value, bytes _data) public {
    sender = _from;
    anyValue = _value;
  }
}
