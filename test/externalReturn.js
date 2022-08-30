const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ExternalReturn', () => {
  describe('transfer(address,address)', async () => {
    it('should return true for non-zero cecipient', async function () {
      const ContractFactory = await ethers.getContractFactory('ExternalReturn');
      const contract = await ContractFactory.deploy();
      await contract.deployed();

      // const testTx = await contract.transfer(
      //   '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      //   '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
      // );

      // console.log(testTx);

      const transferTx = await contract.callStatic.transfer(
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
      );

      expect(transferTx).to.be.true;
    });
  });
});
