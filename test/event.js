const { expec, expect } = require('chai');
const { ethers } = require('hardhat');

describe('Event', () => {
  let contract = null;
  let accounts = null;

  beforeEach(async () => {
    const ContractFactory = await ethers.getContractFactory('Event');
    contract = await ContractFactory.deploy();
    await contract.deployed();

    accounts = await ethers.getSigners();
  });

  describe('emitAddressEvent', async () => {
    it('should emit the msg.sender', async () => {
      await expect(contract.emitEventWithAddress())
        .to.emit(contract, 'ImportantMessage') // name of the event
        .withArgs(accounts[0].address); // expect it to have this argument
    });
  });

  describe('emitEmptyMessage', async () => {
    it('should emit an argument-less event', async () => {
      await expect(contract.emitEmptyMessage())
        .to.emit(contract, 'EmptyMessage') // name of the event
        .withArgs();
    });
  });
});
