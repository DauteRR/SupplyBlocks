pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Product.sol';

contract Manager {
  using TypesLib for TypesLib.EntityType;

  address[] public accounts;
  Entity[] public entities;
  mapping(address => bool) public setEntities;
  mapping(address => bool) public approvedEntities;
  mapping(address => Entity) public entitiesMapping;

  address[] public products;
  mapping(address => Product) public productsMapping;
  mapping(address => bool) public registeredProducts;

  address[] public deliveries;
  mapping(address => Delivery) public deliveriesMapping;
  mapping(address => bool) public registeredDeliveries;

  constructor() public {
    entities.push(
      new Entity(
        'SupplyBlocks',
        'supplyblocks@ull.edu.es',
        '123456789',
        TypesLib.EntityType.Admin,
        msg.sender
      )
    );
    accounts.push(msg.sender);
    entitiesMapping[msg.sender] = entities[entities.length - 1];
    approvedEntities[msg.sender] = true;
    setEntities[msg.sender] = true;
    entitiesMapping[msg.sender].setApproved(true);
  }

  function createEntity(
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    TypesLib.EntityType _type
  ) public {
    require(
      _type != TypesLib.EntityType.Admin,
      'Trying to create an Admin user'
    );
    require(!setEntities[msg.sender], 'Account already registered');
    entities.push(new Entity(_name, _email, _phoneNumber, _type, msg.sender));
    accounts.push(msg.sender);
    entitiesMapping[msg.sender] = entities[entities.length - 1];
    setEntities[msg.sender] = true;
  }

  function createProduct(string memory _name) public {
    require(approvedEntities[msg.sender], 'Non approved account');
    Product newProduct = new Product(_name, entitiesMapping[msg.sender]);
    productsMapping[address(newProduct)] = newProduct;
    registeredProducts[address(newProduct)] = true;
    products.push(address(newProduct));
  }

  function createDelivery(address _productAddress) public {
    require(approvedEntities[msg.sender], 'Non approved account');
    require(registeredProducts[_productAddress], 'Non registered product');

    Delivery newDelivery = new Delivery(productsMapping[_productAddress]);
    deliveriesMapping[address(newDelivery)] = newDelivery;
    registeredDeliveries[address(newDelivery)] = true;
    deliveries.push(address(newDelivery));
  }

  function approveEntity(address _address) public {
    require(entitiesMapping[_address].getSet(), 'Entity not registered');
    require(
      entitiesMapping[msg.sender].getType() == TypesLib.EntityType.Admin,
      'Unauthorized'
    );

    approvedEntities[_address] = true;
    entitiesMapping[_address].setApproved(true);
  }
}