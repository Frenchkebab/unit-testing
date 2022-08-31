const { expect } = require('chai');
const { ethers } = require('hardhat');

function revertReason(reason) {
  return `VM Exception while processing transaction: reverted with reason string '${reason}'`;
}

describe('accounts', async () => {
  const DEPLOYER_ID = 3;
  const ATTACKER_ID = 5;
  const NEW_ADMIN = 4;
  let contract = null;
  let accounts = null;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const ContractFactory = await ethers.getContractFactory('Accounts');
    contract = await ContractFactory.connect(accounts[DEPLOYER_ID]).deploy();
    await contract.deployed();
  });

  describe('admin', async () => {
    it('should be account 0', async () => {
      console.log(await contract.admin());
      console.log(accounts[DEPLOYER_ID].address);
      expect(await contract.admin())
        .to.be.a('string')
        .equal(accounts[DEPLOYER_ID].address);
    });
  });

  describe('changeAdmin', async () => {
    context('rejecting the sender', async () => {
      // SAFER
      it('should accept admin', async () => {
        await expect(
          contract
            .connect(accounts[ATTACKER_ID])
            .changeAdmin(accounts[ATTACKER_ID].address)
        ).to.be.revertedWith(revertReason('only admin'));
      });

      // WARNING https://github.com/NomicFoundation/hardhat/issues/2234
      it('should accept admin', async () => {
        await expect(
          contract
            .connect(accounts[ATTACKER_ID])
            .changeAdmin(accounts[ATTACKER_ID].address)
        ).to.be.revertedWith('on');
      });
    });

    context('accepting the sender', async () => {
      it('should accept the sender', async () => {
        await expect(
          contract
            .connect(accounts[DEPLOYER_ID])
            .changeAdmin(accounts[NEW_ADMIN].address)
        ).to.not.be.reverted;

        expect(await contract.admin())
          .to.be.a('string')
          .equal(accounts[NEW_ADMIN].address);
      });
    });
  });
});
