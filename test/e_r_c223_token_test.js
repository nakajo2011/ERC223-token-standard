const ERC223Token = artifacts.require('ERC223Token.sol')
const ReceiverImpl = artifacts.require('./ReceiverImpl.sol')
const ReceiverNotImpl = artifacts.require('./ReceiverNotImpl.sol')
const ReceiverHasFallback = artifacts.require('./ReceiverHasFallback.sol')

contract('ERC223TokenTest', function (accounts) {
  it("should assert true", async () => {
    const token = await ERC223Token.new();
    const impl = await ReceiverImpl.new();
    const notImpl = await ReceiverNotImpl.new();
    const hasFallback = await ReceiverHasFallback.new();

    const receipt = await token.transfer(impl.address, 20)
    const balance = await token.balanceOf(impl.address)
    assert.equal(20, balance.toNumber())

    try {
      const receipt2 = await token.transfer(notImpl.address, 10)
      assert.fail()
    } catch (e) {
      assert.equal("VM Exception while processing transaction: revert", e.message)
    }

    // fallbackあれば呼べちゃうけどまぁこれは仕方ないよね。。。
    const receipt3 = await token.transfer(hasFallback.address, 5)
    const balance3 = await token.balanceOf(hasFallback.address)
    assert.equal(5, balance3.toNumber())

  });
});
