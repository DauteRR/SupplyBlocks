pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Product.sol';

contract Delivery {
  using TypesLib for TypesLib.ProductState;
  using TypesLib for TypesLib.DeliveryStep;

  address productID;
  TypesLib.DeliveryStep[] steps;

  constructor(Product _product) public {
    require(
      _product.getState() == TypesLib.ProductState.Created,
      'Invalid product initial state'
    );
    productID = address(_product);
    steps.push(
      TypesLib.DeliveryStep(
        _product.getCreatorID(),
        _product.getState(),
        _product.getCreationTimestamp()
      )
    );
  }

  function addStep(
    TypesLib.ProductState _state,
    address _entityAddress,
    uint256 _timestamp
  ) public {
    steps.push(TypesLib.DeliveryStep(_entityAddress, _state, _timestamp));
  }
}
