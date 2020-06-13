pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract Entity {
  enum EntityType { None, Admin, Factory, Transport, Warehouse, Retailer }

  struct EntityData {
    address id;
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
      id: msg.sender,
      name: 'SupplyBlocks',
      email: 'supplyblocks@ull.edu.es',
      phoneNumber: '123456789',
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
      id: _address,
      name: _name,
      email: _email,
      phoneNumber: _phoneNumber,
      entityType: _type,
      set: true,
      approved: false
    });
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

  function getEntities() public view returns (EntityData[] memory) {
    require(entities[msg.sender].approved, 'Address not approved');
    uint256 size = addressLUT.length;
    EntityData[] memory array = new EntityData[](size);
    for (uint256 index = 0; index < addressLUT.length; index++) {
      address _address = addressLUT[index];
      array[index] = entities[_address];
    }

    return array;
  }
}
