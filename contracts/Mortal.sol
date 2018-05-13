pragma solidity ^0.4.23;
import "./Owned.sol";

contract Mortal is Owned{
    function kill() onlyOwner(owner) public {
        selfdestruct(owner);
    }
}