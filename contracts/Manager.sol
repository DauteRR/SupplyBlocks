pragma solidity >=0.4.21 <0.7.0;
import './TypesLibrary.sol';
import './Entity.sol';
import './Product.sol';
pragma experimental ABIEncoderV2;

contract Manager {
  address[] public accounts;
  Entity[] public entities;
  mapping(address => bool) public setEntities;
  mapping(address => bool) public approvedEntities;
  mapping(address => Entity) public entitiesMapping;

  address[] public products;
  mapping(address => Product) public productsMapping;
  mapping(address => bool) public registeredProducts;

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
      'Trying to create an Admin entity'
    );
    require(
      _type != TypesLib.EntityType.None,
      'Trying to create an empty entity'
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

  function approveEntity(address _address) public {
    require(entitiesMapping[_address].getSet(), 'Entity not registered');
    require(
      entitiesMapping[msg.sender].getType() == TypesLib.EntityType.Admin,
      'Unauthorized'
    );

    approvedEntities[_address] = true;
    entitiesMapping[_address].setApproved(true);
  }

  function getEntities() public view returns (TypesLib.EntityData[] memory) {
    uint256 size = 0;
    uint256[] memory indexes = new uint256[](entities.length);
    Entity entity = Entity(entitiesMapping[msg.sender]);
    TypesLib.EntityType entityType = entity.getType();
    for (uint256 index = 0; index < entities.length; index++) {
      if (entityType == TypesLib.EntityType.Admin) {
        indexes[size] = index;
        size += 1;
      } else if (entities[index].getApproved()) {
        indexes[size] = index;
        size += 1;
      }
    }

    TypesLib.EntityData[] memory array = new TypesLib.EntityData[](size);
    for (uint256 it = 0; it < size; it++) {
      array[it] = entities[indexes[it]].getData();
    }

    return array;
  }

  function getProducts() public view returns (TypesLib.ProductData[] memory) {
    require(approvedEntities[msg.sender], 'Address not approved');

    uint256 size = 0;
    uint256[] memory indexes = new uint256[](products.length);
    Entity entity = Entity(entitiesMapping[msg.sender]);
    TypesLib.EntityType entityType = entity.getType();
    for (uint256 index = 0; index < products.length; index++) {
      Product product = Product(products[index]);
      if (
        entityType == TypesLib.EntityType.Admin ||
        entityType == TypesLib.EntityType.Retailer
      ) {
        indexes[size] = index;
        size += 1;
      } else if (product.associatedEntities(entity.getID())) {
        indexes[size] = index;
        size += 1;
      }
    }

    TypesLib.ProductData[] memory array = new TypesLib.ProductData[](size);
    for (uint256 it = 0; it < size; it++) {
      Product product = Product(products[indexes[it]]);
      array[it] = product.getData();
    }
    return array;
  }
}
