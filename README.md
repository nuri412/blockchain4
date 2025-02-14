# AI Model Marketplace Web Application

## Overview
This is a decentralized web application built using Hardhat, React, and Solidity. The application provides a marketplace for AI models where users can authenticate, view available models, check their token balances, and purchase models using ERC-20 tokens.

---

## Technologies Used
- Hardhat: For smart contract development and testing.
- React: For the frontend user interface.
- Solidity: For writing Ethereum smart contracts.
- MetaMask: For wallet integration and blockchain interactions.
- ERC-20 Tokens: For handling marketplace transactions.

---

## Features

### 3.1 User Authentication and Wallet Integration
- Wallet connection functionality using MetaMask.
- Users can securely connect their wallets to interact with the blockchain.
- Session management to track connected wallets.

### 3.2 Token Balance Display
- Real-time display of the user's ERC-20 token balance.
- Manual refresh button to update the balance when needed.

### 3.3 AI Model Listings
- Display available AI models with:
  - Model Name
  - Description
  - Price (in ERC-20 tokens)
  - Seller Details (wallet address)
- Allow sellers to create new listings with:
  - Model details (name, description, etc.)
  - Price specification
  - Secure upload of model files or access links

### 3.4 Purchase Flow
- Buyers can:
  - View detailed information about AI models.
  - Initiate model purchases by transferring ERC-20 tokens.
  - Marketplace UI updates automatically to reflect successful transactions.

---

## Installation Guide

1. Clone the repository:
   
shell

bash
   git clone https://github.com/your-username/ai-model-marketplace.git
   cd ai-model-marketplace
   

2. Install dependencies:
   
shell

bash
   npm install
   

3. Compile smart contracts:
   
bash
   npx hardhat compile
   

4. Start the Hardhat local network:
   
bash
   npx hardhat node
   

5. Deploy contracts:
   
shell

bash
   npx hardhat run scripts/deploy.js --network localhost
   

6. Start the React application:
   
shell

bash
   npm start
   

---

## MetaMask Configuration

- Open MetaMask → Settings → Networks → Add Network
- Input the following:
  - Network Name: Hardhat Local
  - RPC URL: http://127.0.0.1:8545
  - Chain ID: 31337
  - Currency Symbol: ETH

---

## Usage

1. Connect wallet via MetaMask.
2. Check ERC-20 token balance.
3. View, create, or purchase AI model listings.
4. Confirm transactions and view updates in real-time.
