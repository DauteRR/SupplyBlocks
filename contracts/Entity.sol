pragma solidity >=0.4.21 <0.7.0;

contract Entity {
  enum EntityType { None, Admin, Factory, Transport, Warehouse, Retailer }

  struct EntityData {
    string name;
    string email;
    string phoneNumber;
    EntityType entityType;
    bool set;
    bool approved;
  }

  address[] public addressLUT;
  mapping(address => EntityData) public entities;

  constructor() public {
    addressLUT.push(msg.sender);
    entities[msg.sender] = EntityData({
      name: 'SupplyBlocks',
      email: 'supplyblocks@.ull.edu.es',
      phoneNumber: '',
      entityType: EntityType.Admin,
      set: true,
      approved: true
    });
  }

  function create(
    address _address,
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    EntityType _type
  ) public {
    require(!entities[_address].set, 'Address already registered');
    require(_type != EntityType.Admin, 'Unauthorized');
    require(_address == msg.sender, 'Unauthorized');

    addressLUT.push(_address);
    entities[_address] = EntityData({
      name: _name,
      email: _email,
      phoneNumber: _phoneNumber,
      entityType: _type,
      set: true,
      approved: false
    });
  }

  function entitiesCount() public view returns (uint256) {
    return (addressLUT.length);
  }

  function approveEntity(address _entity) public {
    require(entities[_entity].set, 'Address not registered');
    require(!entities[_entity].approved, 'Address already approved');
    require(
      entities[msg.sender].entityType == EntityType.Admin,
      'Unauthorized'
    );

    entities[_entity].approved = true;
  }

  function getAddressLUT() public view returns (address[] memory) {
    return addressLUT;
  }
}
