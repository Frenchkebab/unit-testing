const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber, utils } = ethers;

function revertReason(reason) {
  return `VM Exception while processing transaction: reverted with reason string '${reason}'`;
}

describe('BlockNumber', async () => {
  let contract = null;
  let accounts = null;
  let provider = null;

  beforeEach(async () => {
    provider = ethers.provider;
    const ContractFactory = await ethers.getContractFactory('BlockNumber');
    contract = await ContractFactory.deploy();
    await contract.deployed();

    accounts = await ethers.getSigners();

    await provider.send('hardhat_setBalance', [
      contract.address,
      utils.hexValue(utils.parseEther('5')),
    ]);
  });

  describe('gambleOnTenthBlockNumber', async () => {
    it('should accept 1 ether', async () => {
      await provider.send('hardhat_setBalance', [
        contract.address,
        utils.hexValue(utils.parseEther('5')),
      ]);

      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1000)),
      ]);

      await contract.gambleOnTenthBlockNumber({
        value: ethers.utils.parseEther('1'),
      });
    });

    it('should reject 1.1 ether', async () => {
      await provider.send('hardhat_setBalance', [
        contract.address,
        utils.hexValue(utils.parseEther('5')),
      ]);

      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1000)),
      ]);

      await expect(
        contract.gambleOnTenthBlockNumber({
          value: ethers.utils.parseEther('1.1'),
        })
      ).to.be.revertedWith(revertReason('not degen enough'));
    });

    it('should revert if the contract less than 1 ether', async () => {
      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1000)),
      ]);

      await expect(
        contract.gambleOnTenthBlockNumber({
          value: ethers.utils.parseEther('1'),
        })
      ).to.be.revertedWith(revertReason(`can't gamble with you`));
    });

    it('should revert if the contract less than 1 ether', async () => {
      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1000)),
      ]);

      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1000)),
      ]);

      await expect(
        contract.gambleOnTenthBlockNumber({
          value: ethers.utils.parseEther('1'),
        });
      );

      await provider.send('hardhat_mine', [
        utils.hexStripZeros(utils.hexValue(1)),
      ]).to.be.revertedWith(revertReason('wait for cooldown time'));
    });
});
