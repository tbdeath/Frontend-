const { expect } = require('chai');

// Start test block
describe('MyERC20', function () {
  ownerAddress = 0;
  address1 = 0;
  address2 = 0;

  before(async function () {
    this.MyERC20 = await ethers.getContractFactory('MyERC20');
    this.myERC20 = await this.MyERC20.deploy();
    const [owner, addr1, addr2] = await ethers.getSigners();
    ownerAddress = owner.address;
    address1 = addr1.address;
    address2 = addr2.address;
    await this.myERC20.deployed(owner.address);
  });

  // Test case
  it("has a name", async function () {
    expect(await this.myERC20.name()).to.be.equal('MyERC20');
  });

  it("distributes tokens", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await this.myERC20.mint(ownerAddress, 10);
    await this.myERC20.transfer(address1, 3);
    // expect(await this.myERC20.balanceOf(ownerAddress)).to.be.equal(9);
    await this.myERC20.connect(addr1).approve(address1, 3);
    await this.myERC20.connect(addr1).transferFrom(address1, address2, [2]);
    expect(await this.myERC20.balanceOf(address1)).to.be.equal(1);
  })
});