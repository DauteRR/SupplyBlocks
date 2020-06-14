pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
pragma experimental ABIEncoderV2;

contract Product {
  using TypesLib for TypesLib.ProductState;
  using TypesLib for TypesLib.ProductData;

  TypesLib.ProductData public data;

  TypesLib.DeliveryStep[] steps;

  mapping(address => bool) public associatedEntities;

  constructor(string memory _name, Entity _factory) public {
    require(
      _factory.getType() == TypesLib.EntityType.Factory,
      'Non factory entity'
    );

    data = TypesLib.ProductData({
      id: address(this),
      name: _name,
      state: TypesLib.ProductState.Created,
      creatorID: _factory.getID(),
      creationTimestamp: now,
      purchaserID: address(0),
      deliveryTimestamp: 0
    });

    associatedEntities[_factory.getID()] = true;
  }

  function setShipped(Entity _transport) public {
    require(
      _transport.getType() == TypesLib.EntityType.Transport,
      'Non transport entity'
    );
    require(
      data.state == TypesLib.ProductState.Created ||
        data.state == TypesLib.ProductState.Stored,
      'Wrong previous state'
    );
    data.state = TypesLib.ProductState.Shipped;
    addDeliveryStep(data.state, _transport.getID(), now);
    associatedEntities[_transport.getID()] = true;
  }

  function setStored(Entity _warehouse) public {
    require(
      _warehouse.getType() == TypesLib.EntityType.Warehouse,
      'Non warehouse entity'
    );
    require(
      data.state == TypesLib.ProductState.Shipped,
      'Wrong previous state'
    );
    data.state = TypesLib.ProductState.Stored;
    addDeliveryStep(data.state, _warehouse.getID(), now);
    associatedEntities[_warehouse.getID()] = true;
  }

  function setDelivered(Entity _retailer) public {
    require(
      _retailer.getType() == TypesLib.EntityType.Retailer,
      'Non retailer entity'
    );
    require(
      data.state == TypesLib.ProductState.Shipped,
      'Wrong previous state'
    );
    data.state = TypesLib.ProductState.Delivered;
    data.purchaserID = _retailer.getID();
    data.deliveryTimestamp = now;
    addDeliveryStep(data.state, _retailer.getID(), data.deliveryTimestamp);
    associatedEntities[_retailer.getID()] = true;
  }

  function getData() public view returns (TypesLib.ProductData memory) {
    return data;
  }

  function getState() public view returns (TypesLib.ProductState) {
    return data.state;
  }

  function getCreatorID() public view returns (address) {
    return data.creatorID;
  }

  function getCreationTimestamp() public view returns (uint256) {
    return data.creationTimestamp;
  }

  function addDeliveryStep(
    TypesLib.ProductState _state,
    address _entityAddress,
    uint256 _timestamp
  ) public {
    steps.push(TypesLib.DeliveryStep(_entityAddress, _state, _timestamp));
  }
}
