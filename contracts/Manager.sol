pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Product.sol';

contract Manager {
  using TypesLib for TypesLib.EntityType;

  Entity supplyBlocks;

  mapping(address => Entity) public entitiesMapping;
  address[] public products;
  mapping(address => Product) public productsMapping;
  address[] public deliveries;

  constructor() public {
    supplyBlocks = new Entity(
      'SupplyBlocks',
      'supplyblocks@ull.edu.es',
      '123456789',
      TypesLib.EntityType.Admin,
      true,
      true
    );
    entitiesMapping[msg.sender] = supplyBlocks;
  }

  function checkAccount(address _address) public view returns (bool) {
    return (entitiesMapping[_address].set());
  }

  function createEntity(
    address _address,
    string memory _name,
    string memory _email,
    string memory _phoneNumber,
    TypesLib.EntityType _type
  ) public {
    require(
      _type != TypesLib.EntityType.Admin,
      'Trying to create an Admin user'
    );
    require(!checkAccount(_address), 'Account already registered');
    entitiesMapping[_address] = new Entity(
      _name,
      _email,
      _phoneNumber,
      _type,
      true,
      false
    );
  }

  function createProduct(address _address, string memory _name) public {
    Product newProduct = new Product(_name, entitiesMapping[_address]);
    productsMapping[address(newProduct)] = newProduct;
    products.push(address(newProduct));
  }

  function createDelivery(address _delivery, Entity _entity) public {
    require(
      _entity.entityType() == TypesLib.EntityType.Factory,
      'Non factory entity'
    );
    deliveries.push(_delivery);
  }
}
