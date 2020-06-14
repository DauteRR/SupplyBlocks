pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
pragma experimental ABIEncoderV2;

contract Entity {
  using TypesLib for TypesLib.EntityData;

  TypesLib.EntityData public data;

  constructor(
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    TypesLib.EntityType _type,
    address _id
  ) public {
    data = TypesLib.EntityData({
      id: _id,
      name: _name,
      email: _email,
      phoneNumber: _phoneNumber,
      entityType: _type,
      set: true,
      approved: false
    });
  }

  function setApproved(bool _approved) public {
    data.approved = _approved;
  }

  function getData() public view returns (TypesLib.EntityData memory) {
    return data;
  }

  function getType() public view returns (TypesLib.EntityType) {
    return data.entityType;
  }
}
