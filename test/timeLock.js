const { expect } = require('chai');
const { ethers } = require('hardhat');
const { utils } = ethers;
const { BigNumber } = ethers;

function revertReason(reason) {
  return `VM Exception while processing transaction: reverted with reason string '${reason}'`;
}

describe('SimpleTransfer', async () => {
  let contract = null;
  let provider = null;
  let accounts = null;
  const SMALL_ETHER = new BigNumber.from(utils.parseEther('0.01'));

  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory('TimeLock');
    contract = await ContractFactory.deploy();
    await contract.deployed();

    provider = await ethers.provider;
    acccounts = await.ethers getSigners();
  })

  context('initial conditions', async () => {
    it('should have zero balance', async () => {
      const balance = await provider.getBalance(contract.address);
      expect(balance).to.be.equal(new BigNumber.from(0));
    })
  })

  describe('deposit', async () => {
    it('should deposit 100 ether', async () => {
      const tx = await contract
        .connect(accounts[0])
        .deposit({ value: ethers.utils.parseEther('100') });
      await tx.wait();

      expect(await provider.getBalance(contract.address)).to.be.equal(
        new BigNumber.from(utils.parseEther('100'))
      )
    })
  })

  describe('withdraw', async () => {
    it('should block withdrawal before 1 day', async () => {
      const tx = await contract
        .connect(accounts[1])
        .deposit({ value: ethers.utils.parseEther('100') });
      await tx.wait();

      expect(await provider.getBalance(contract.address)).to.be.equal(
        new BigNumber.from(utils.parseEther('100'))
      )

      await expect(contract.connect(accounts[1]).withdraw()).to.be.revertedWith(
        revertReason('cannot withdraw yet');
      )
    })

    it('should allow withdrawal after 1 day', async () => {
      const originalBalance = await provider.getBalance(accounts[1].address);

      const tx = await contract
        .connect(accounts[0])
        .deposit({ value: ethers.utils.parseEther('100') });
      await tx.wait();

      await provider.send('evm_increaseTime', [24 * 60 * 60 + 1]);

      expect(await provider.getBalance(contract.address)).to.be.equal(
        new BigNumber.from(utils.parseEther('100'))
      )
      await expect(contract.connect(accounts[1]).withdraw()).to.not.be.reverted;

      const balance = await provider.getBalance(accounts[1].address);

      expect balance = await provider.getBalance(accounts[1].address);

      expect(balance).to.be.closeTo(
        originalBalance,
        SMALL_ETHER
      )
    })
  })
});
