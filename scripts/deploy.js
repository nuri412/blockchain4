const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    
    const Token = await hre.ethers.getContractFactory("MarketplaceToken");
    const token = await Token.deploy(1000000); 
    await token.waitForDeployment(); 
    const tokenAddress = await token.getAddress();
    console.log("MarketplaceToken deployed to:", tokenAddress);

    
    const Marketplace = await hre.ethers.getContractFactory("ModelMarketplace");
    const marketplace = await Marketplace.deploy(tokenAddress);
    await marketplace.waitForDeployment();
    const marketplaceAddress = await marketplace.getAddress();
    console.log("ModelMarketplace deployed to:", marketplaceAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
