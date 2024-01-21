// 2_deploy_contract.js
const PurchaseAgreement = artifacts.require("PurchaseAgreement");

module.exports = function(deployer) {
    const sellerAddress = "0xAC1D130AFd763816193Fa467edE584c4D775AE2a";
    const productPrice = web3.utils.toWei("0.00077*Wei", "ether");
  deployer.deploy(PurchaseAgreement, sellerAddress, productPrice);
};
