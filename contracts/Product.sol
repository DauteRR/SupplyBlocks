pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Delivery.sol';
pragma experimental ABIEncoderV2;

contract Product {
  using TypesLib for TypesLib.ProductState;
  using TypesLib for TypesLib.ProductData;

  TypesLib.ProductData public data;

  mapping(address => bool) public associatedEntities;

  // TODO: store address
  constructor(string memory _name, Entity _factory) public {
    require(
      _factory.getType() == TypesLib.EntityType.Factory,
      'Non factory entity'
    );

    data = TypesLib.ProductData({
      name: _name,
      state: TypesLib.ProductState.Created,
      creatorID: address(_factory),
      creationTimestamp: now,
      purchaserID: address(0),
      deliveryTimestamp: 0
    });

    associatedEntities[address(_factory)] = true;
  }

  function setShipped(Entity _transport, Delivery _delivery) public {
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
    _delivery.addStep(data.state, address(_transport), now);
    associatedEntities[address(_transport)] = true;
  }

  function setStored(Entity _warehouse, Delivery _delivery) public {
    require(
      _warehouse.getType() == TypesLib.EntityType.Warehouse,
      'Non warehouse entity'
    );
    require(
      data.state == TypesLib.ProductState.Shipped,
      'Wrong previous state'
    );
    data.state = TypesLib.ProductState.Stored;
    _delivery.addStep(data.state, address(_warehouse), now);
    associatedEntities[address(_warehouse)] = true;
  }

  function setDelivered(Entity _retailer, Delivery _delivery) public {
    require(
      _retailer.getType() == TypesLib.EntityType.Retailer,
      'Non retailer entity'
    );
    require(
      data.state == TypesLib.ProductState.Shipped,
      'Wrong previous state'
    );
    data.state = TypesLib.ProductState.Delivered;
    data.purchaserID = address(_retailer);
    data.deliveryTimestamp = now;
    _delivery.addStep(data.state, address(_retailer), data.deliveryTimestamp);
    associatedEntities[address(_retailer)] = true;
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
}
