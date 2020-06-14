pragma solidity >=0.4.21 <0.7.0;

library TypesLib {
  enum EntityType { None, Admin, Factory, Transport, Warehouse, Retailer }

  enum ProductState { Created, Shipped, Stored, Delivered }

  struct DeliveryStep {
    address entityAddress;
    ProductState productState;
    uint256 timestamp;
  }

  struct EntityData {
    address id;
    string name;
    string email;
    string phoneNumber;
    TypesLib.EntityType entityType;
    bool set;
    bool approved;
  }
}
