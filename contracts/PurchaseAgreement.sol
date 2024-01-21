// PurchaseAgreement.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PurchaseAgreement {
    address public seller;
    address public customer;
    uint256 public productPrice;
    bool public isFulfilled;

    event PurchaseCompleted();

    constructor(address _seller, uint256 _price) {
        seller = _seller;
        customer = msg.sender;
        productPrice = _price;
        isFulfilled = false;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can execute this.");
        _;
    }

    modifier onlyCustomer() {
        require(msg.sender == customer, "Only the customer can execute this.");
        _;
    }

    function fulfillPurchase() public onlySeller {
        require(!isFulfilled, "Purchase is already fulfilled.");
        isFulfilled = true;
        emit PurchaseCompleted();
    }
}
