async function main () {
  // We get the contract to deploy
  const MyERC20 = await ethers.getContractFactory('MyERC20');
  console.log('Deploying MyERC20...');
  const myERC20 = await MyERC20.deploy();
  await myERC20.deployed();
  console.log('MyERC20 deployed to:', MyERC20.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
