pragma solidity ^0.4.11;


/**
* @title Contract that will work with ERC223 tokens.
*/

contract ReceiverHasFallback {

  address public sender;

  uint public anyValue;

  /**
   * @dev fallback function
   *
   */
  function () public {
    sender = 0x01;
    anyValue = 1;
  }

}
