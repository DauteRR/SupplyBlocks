const Entity = artifacts.require('Entity');

module.exports = function(deployer) {
  deployer.deploy(Entity);
} as Truffle.Migration;

export {};