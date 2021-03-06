pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Manager.sol';
pragma experimental ABIEncoderV2;

contract Product {
  TypesLib.ProductData public data;

  mapping(address => bool) public associatedEntities;

  constructor(string memory _name, Entity _factory) public {
    require(
      _factory.getType() == TypesLib.EntityType.Factory,
      'Non factory entity'
    );
    require(_factory.getApproved(), 'Non approved factory');

    data = TypesLib.ProductData({
      id: address(this),
      name: _name,
      state: TypesLib.ProductState.Created,
      creatorID: _factory.getID(),
      creationTimestamp: now,
      purchaserID: address(0),
      deliveryEntities: new address[](0),
      deliveryTimestamps: new uint256[](0),
      deliveryStep: 0
    });

    associatedEntities[_factory.getID()] = true;
  }

  function prepareDelivery() public {
    require(
      msg.sender == data.creatorID,
      'Unauthorized for delivery preparation'
    );
    require(data.state != TypesLib.ProductState.Prepared, 'Already prepared');
    data.deliveryTimestamps[data.deliveryStep] = now;
    data.state = TypesLib.ProductState.Prepared;
    data.deliveryStep += 1;
  }

  function timestampDeliveryStep() public {
    require(
      data.deliveryEntities[data.deliveryStep] == msg.sender,
      'Unauthorized'
    );
    require(data.deliveryStep >= 1, 'Delivery not prepared');

    if (data.deliveryStep == data.deliveryEntities.length - 1) {
      require(
        data.state == TypesLib.ProductState.Shipped,
        'Wrong Delivery previous step'
      );
      data.state = TypesLib.ProductState.Delivered;
    } else if (data.deliveryStep == 1) {
      require(
        data.state == TypesLib.ProductState.Prepared,
        'Wrong Shipped previous step'
      );
      data.state = TypesLib.ProductState.Shipped;
    } else {
      if (data.deliveryStep % 2 == 1) {
        require(
          data.state == TypesLib.ProductState.Stored,
          'Wrong Shipped previous step'
        );
        data.state = TypesLib.ProductState.Shipped;
      } else {
        require(
          data.state == TypesLib.ProductState.Shipped,
          'Wrong Stored previous step'
        );
        data.state = TypesLib.ProductState.Stored;
      }
    }
    data.deliveryTimestamps[data.deliveryStep] = now;
    data.deliveryStep += 1;
  }

  function storeDeliveryStep(address _entityAddress) private {
    data.deliveryEntities.push(_entityAddress);
    data.deliveryTimestamps.push(0);
    associatedEntities[_entityAddress] = true;
  }

  function purchase(address[] memory _routeEntities, address _managerAddress)
    public
  {
    require(data.purchaserID == address(0), 'Product already purchased');
    require(_routeEntities.length >= 3, 'Invalid delivery route');
    require(
      msg.sender == _routeEntities[_routeEntities.length - 1],
      'Unauthorized'
    );

    Manager manager = Manager(_managerAddress);
    require(manager.approvedEntities(msg.sender), 'Non approved retailer');
    require(manager.registeredProducts(data.id), 'Non registered product');
    require(
      manager.entitiesMapping(msg.sender).getType() ==
        TypesLib.EntityType.Retailer,
      'Non retailer entity'
    );

    data.purchaserID = msg.sender;

    require(
      manager.entitiesMapping(_routeEntities[0]).getID() == data.creatorID,
      'Invalid first delivery step'
    );

    storeDeliveryStep(_routeEntities[0]);
    for (uint256 index = 1; index < _routeEntities.length - 1; index++) {
      require(
        manager.approvedEntities(_routeEntities[index]),
        'Non approved entity'
      );
      bool shouldBeTransportEntity = (index % 2 == 1);
      if (shouldBeTransportEntity) {
        require(
          manager.entitiesMapping(_routeEntities[index]).getType() ==
            TypesLib.EntityType.Transport,
          'Invalid transport delivery step'
        );
      } else {
        require(
          manager.entitiesMapping(_routeEntities[index]).getType() ==
            TypesLib.EntityType.Warehouse,
          'Invalid warehouse delivery step'
        );
      }
      storeDeliveryStep(_routeEntities[index]);
    }
    require(
      manager
        .entitiesMapping(_routeEntities[_routeEntities.length - 1])
        .getType() == TypesLib.EntityType.Retailer,
      'Invalid last delivery step'
    );
    storeDeliveryStep(_routeEntities[_routeEntities.length - 1]);
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

  function getPurchaserID() public view returns (address) {
    return data.purchaserID;
  }

  function getCreationTimestamp() public view returns (uint256) {
    return data.creationTimestamp;
  }
}
