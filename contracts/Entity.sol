pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';

contract Entity {
  using TypesLib for TypesLib.EntityType;

  address public id;
  string public name;
  string public email;
  string public phoneNumber;
  TypesLib.EntityType public entityType;
  bool public set;
  bool public approved;

  constructor(
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    TypesLib.EntityType _type,
    address _id
  ) public {
    id = _id;
    name = _name;
    email = _email;
    phoneNumber = _phoneNumber;
    entityType = _type;
    set = true;
    approved = false;
  }

  function setApproved(bool _approved) public {
    approved = _approved;
  }
}
