pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';

contract Entity {
  using TypesLib for TypesLib.EntityType;

  string public name;
  string public email;
  string public phoneNumber;
  TypesLib.EntityType public entityType;
  bool public set;

  constructor(
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    TypesLib.EntityType _type,
    bool _set
  ) public {
    name = _name;
    email = _email;
    phoneNumber = _phoneNumber;
    entityType = _type;
    set = _set;
  }
}
