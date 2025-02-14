// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ModelMarketplace {
    IERC20 public token; // ERC-20 токен для платежей

    struct Model {
        uint256 id;
        string name;
        string description;
        uint256 price;
        address seller;
        bool sold;
        string fileUrl;
    }

    Model[] public models;
    uint256 public nextId;

    event ModelListed(uint256 id, string name, uint256 price, address seller);
    event ModelSold(uint256 id, address buyer, address seller);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function listModel(string memory name, string memory description, uint256 price, string memory fileUrl) public {
        require(price > 0, "Price must be greater than zero");
        
        models.push(Model(nextId, name, description, price, msg.sender, false, fileUrl));
        emit ModelListed(nextId, name, price, msg.sender);
        nextId++;
    }

    function buyModel(uint256 modelId) public {
        Model storage model = models[modelId];

        require(!model.sold, "Model is already sold");
        require(token.transferFrom(msg.sender, model.seller, model.price), "Payment failed");

        model.sold = true;
        emit ModelSold(modelId, msg.sender, model.seller);
    }

    function getModels() public view returns (Model[] memory) {
        return models;
    }
}
