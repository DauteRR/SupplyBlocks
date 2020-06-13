// TODO: Check behaviour
const Manager = artifacts.require('Manager');
const Entity = artifacts.require('Entity');
const Delivery = artifacts.require('Delivery');
const Product = artifacts.require('Product');

module.exports = function(deployer) {
  deployer.deploy(Manager);
} as Truffle.Migration;

export {};
