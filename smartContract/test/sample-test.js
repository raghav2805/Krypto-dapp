const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing Transaction contract", function () {
  let addr1, addr2, signer;

  beforeEach("deploying Transaction", async () =>{
    const transactionFactory = await ethers.getContractFactory("Transaction");
    transaction = await transactionFactory.deploy();
    await transaction.deployed();

    [signer, addr1,addr2] = await ethers.getSigners();

  })

  it("Should return the transaction details", async function () {
    expect(await transaction.getTransactionCount()).to.equal(0);
    expect(await transaction.getAllTransactions()).to.deep.equal([]);
  });

  it("should track all transction", async () =>{
    await transaction.connect(addr1).addToBlockchain(addr2.address, 1,"Hey", "testing going on");
    expect(await transaction.getTransactionCount()).to.equal(1);
  });

});
