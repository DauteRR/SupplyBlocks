pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Delivery.sol';

contract Product {
  using TypesLib for TypesLib.ProductState;

  string public name;
  TypesLib.ProductState public state;
  address public creatorID;
  uint256 public creationTimestamp;
  address public purchaserID;
  uint256 public deliveredTimestamp;

  constructor(string memory _name, Entity _factory) public {
    require(
      _factory.entityType() == TypesLib.EntityType.Factory,
      'Non factory entity'
    );

    name = _name;
    state = TypesLib.ProductState.Created;
    creatorID = address(_factory);
    creationTimestamp = block.timestamp;
    purchaserID = address(0);
    deliveredTimestamp = 0;
  }

  function setShipped(Entity _transport, Delivery _delivery) public {
    require(
      _transport.entityType() == TypesLib.EntityType.Transport,
      'Non transport entity'
    );
    require(
      state == TypesLib.ProductState.Created ||
        state == TypesLib.ProductState.Stored,
      'Wrong previous state'
    );
    state = TypesLib.ProductState.Shipped;
    _delivery.addStep(state, address(_transport), block.timestamp);
  }

  function setStored(Entity _warehouse, Delivery _delivery) public {
    require(
      _warehouse.entityType() == TypesLib.EntityType.Warehouse,
      'Non warehouse entity'
    );
    require(state == TypesLib.ProductState.Shipped, 'Wrong previous state');
    state = TypesLib.ProductState.Stored;
    _delivery.addStep(state, address(_warehouse), block.timestamp);
  }

  function setDelivered(Entity _retailer, Delivery _delivery) public {
    require(
      _retailer.entityType() == TypesLib.EntityType.Retailer,
      'Non retailer entity'
    );
    require(state == TypesLib.ProductState.Shipped, 'Wrong previous state');
    state = TypesLib.ProductState.Delivered;
    purchaserID = address(_retailer);
    deliveredTimestamp = block.timestamp;
    _delivery.addStep(state, address(_retailer), deliveredTimestamp);
  }
}
