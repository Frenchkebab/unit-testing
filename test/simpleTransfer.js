const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const { utils } = ethers;
const { Bignumber } = ethers;

describe('SimpleTransfer', async () => {
  let contract = null;
  let provider = null;

  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory('SimpleTransfer');
    contract = await ContractFactory.deploy();
    await contract.deployed();

    accounts = await ethers.getSigners();

    // don't do this, it will connect to the mainnet !!
    // provider = await ethers.getDefaultProvider();
    provider = await ethers.provider;
    twentyThousandEtherInHex = utils.hexStripZeros(
      utils.parseEther('20000').toHexString()
    );

    // send requires to use Hex
    await provider.send('hardhat_setBalance', [
      accounts[0].address,
      twentyThousandEtherInHex,
    ]);
  });

  context('initial conditions', async () => {
    it('should have zero balance', async () => {
      const balance = await provider.getBalance(contract.address); // get the balance of the contract
      expect(balance).to.be.equal(new BigNumber.from(0)); // the initial value will be 0
    });

    it('account 0 should have 20,000 ether', async () => {
      const balance = await provider.getBalance(accounts[0].address); //
      expect(balance).to.be.equal(
        new BigNumber.from(utils.parseEther('20000'))
      );
    });
  });

  describe('deposit', async () => {
    // FAILS - don't forget the gas fee!
    xit('should deposit 10,000 ether', async () => {
      const tx = await contract
        .connect(accounts[0])
        .deposit({ value: ethers.utils.parseEther('10000') });
      await tx.wait();

      expect(await provider.getBalance(contract.address)).to.be.equal(
        new BigNumber.from(utils.parseEther('10000'))
      );

      expect(await provider.getBalance(accounts[0].address)).to.be.equal(
        new BigNumber.from(utils.parseEther('10000'))
      );
    });

    it('should deposit 10,000 ether', async () => {
      const tx = await contract
        .connect(accounts[0])
        .deposit({ value: ethers.utils.parseEther('10000') });
      await tx.wait();
      expect(await provider.getBalance(contract.address)).to.be.equal(
        new BigNumber.from(utils.parseEther('10000'))
      );
    });
  });

  describe('withdraw', async () => {
    it('should deposit 10,000 ether', async () => {
      const tx = await contract
        .connect(accounts[0])
        .deposit({ value: ethers.utils.parseEther('10000') });
    });
    await tx.wait();

    expect(await provider.getBalance(contract.address)).to.be.equal(
      new BigNumber.from(utils.parseEther('10000'))
    );

    const txWithdraw = await contract.connect(accounts[0]).withdraw();
    await txWithdraw.wait();

    expect(await provider.getBalance(contract.address)).to.be.equal(
      new BigNumber.from(0)
    );
    expect(await provider.getBalance(accounts[0].address)).to.be.closeTo(
      new BigNumber.from(utils.parseEther('20000')),
      new BigNumber.from(utils.parseEther('0.001'))
    );
  });
});
