
const hre = require("hardhat");

async function main() {

  const [owner, randomPerson] = await hre.ethers.getSigners();
  const WavePortal = await hre.ethers.getContractFactory("WavePortal");
  const wavePortal = await WavePortal.deploy( {
    value: hre.ethers.utils.parseEther('0.1')
  } );

  await wavePortal.deployed();

  console.log("WavePortal deployed to:", wavePortal.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBal = await hre.ethers.provider.getBalance(
    wavePortal.address
  );

  console.log("initial contract bal: ", hre.ethers.utils.formatEther(contractBal) )


  let waveTxn = await wavePortal.wave("This is wave 1!");
  await waveTxn.wait()


  waveTxn = await wavePortal.wave("This is wave 2!");
  await waveTxn.wait()

  contractBal = await hre.ethers.provider.getBalance(
    wavePortal.address
  )

  console.log("new contract bal: ", hre.ethers.utils.formatEther(contractBal))

  let allWaves = await wavePortal.getAllWaves()
  console.log(allWaves)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
