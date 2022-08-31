const { ethers } = require('hardhat');

const accountFunction = async () => {
  accounts = await ethers.getSigners();
  console.log(typeof accounts);
};

accountFunction();
