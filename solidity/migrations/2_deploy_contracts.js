const Holomi = artifacts.require("Holomi");
const TreeFactory = artifacts.require("TreeFactory");
const PalguNamu = artifacts.require("PalguNamu");

module.exports = async function(deployer) {
  await deployer.deploy(Holomi);
  await deployer.deploy(TreeFactory);

  const holomi = await Holomi.deployed();
  const treeFactory = await TreeFactory.deployed();

  await deployer.deploy(PalguNamu, holomi.address, treeFactory.address);

  const palguNamu = await PalguNamu.deployed();

  await palguNamu.setApproveToken(palguNamu.address);
};