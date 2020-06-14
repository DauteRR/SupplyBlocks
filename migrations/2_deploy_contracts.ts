const Manager = artifacts.require('Manager');

module.exports = function(deployer) {
  deployer.deploy(Manager);
} as Truffle.Migration;

export {};
