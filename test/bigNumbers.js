const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

describe('BigNumbers', async () => {
  let bigNumberContract = null;

  beforeEach(async function () {
    // deploy (before each describe)
    const BigNumberContractFactory = await ethers.getContractFactory(
      'BigNumbers'
    );
    bigNumberContract = await BigNumberContractFactory.deploy();
    await bigNumberContract.deployed();
  });

  describe('getNumber', async () => {
    // BAD
    it('should get zero', async () => {
      // when a variable is initialized it's default to zero
      expect(await bigNumberContract.getNumber()).to.be.equal(0);
    });
  });

  // BAD - overflow
  describe('setToTheMax BAD', async () => {
    it('should set the number to the maximum', async () => {
      const tx = await bigNumberContract.setToTheMax();
      await tx.wait();

      expect(await bigNumberContract.getNumber()).to.be.equal(
        11579208923731619542357098500867907853269984665640564039457584007913129639935
      );
    });
  });

  // good - using bigNumber
  describe('setToTheMax BAD', async () => {
    it.only('should set the number to the maximum', async () => {
      const tx = await bigNumberContract.setToTheMax();
      await tx.wait();

      expect(await bigNumberContract.getNumber()).to.be.equal(
        new BigNumber.from(
          '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        )
      );
    });
  });
});
