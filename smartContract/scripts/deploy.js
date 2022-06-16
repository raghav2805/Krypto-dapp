
const main = async () => {
  const Transaction = await hre.ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  await transaction.deployed();

  console.log("transaction deployed to:", transaction.address);

  const _rewardToken = await hre.ethers.getContractFactory("rewardToken");
  const RewardToken = await _rewardToken.deploy();

  await RewardToken.deployed();

  console.log("RewardToken deployed to:", RewardToken.address);

  const stacking = await hre.ethers.getContractFactory("stacking");
  const Stacking = await stacking.deploy(RewardToken.address, RewardToken.address);

  await Stacking.deployed();

  console.log("Stacking deployed to:", Stacking.address);
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

// transaction deployed to: 0x6f354b48B120321c34F6b57240F316eb606B8FA5
// RewardToken deployed to: 0xA14c53070b766795b0299EF2A22A3b2563571aB2
// Stacking deployed to: 0x63c724BbD23E686c1395A92339da946F6e377a01