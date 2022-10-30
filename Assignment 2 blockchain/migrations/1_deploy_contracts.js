const ether = 10**18; // 1 ether = 1000000000000000000 wei

var Banking = artifacts.require("Banking");

module.exports = function(deployer) {
  deployer.deploy(Banking);
};