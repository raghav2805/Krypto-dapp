
const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log("transaction deployed to:", transaction.address);
}

const runMain = async () =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

//0x8d7CD94462965c3F8B799215A3E69b7d16D83773